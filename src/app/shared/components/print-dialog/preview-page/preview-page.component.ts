import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject, catchError, debounceTime, of, switchMap } from 'rxjs';
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from 'pdfjs-dist';

import { PreviewPageConfig } from './preview-page-config';
import { CmButton } from '../../button/button';
import { ExportService } from '@shared/services/export.service';
import { PrintMarkupService } from '@shared/services/print-markup.service';
import { PrintDialogConfig } from '../print-dialog-config';

type PdfJsModule = typeof import('pdfjs-dist');

const WORKER_SRC = 'assets/pdfjs/pdf.worker.min.mjs';
const CANVAS_SHADOW_MARGIN = 12;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-preview-page',
    templateUrl: './preview-page.component.html',
    styleUrls: ['./preview-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatIconModule,
        CmButton,
    ]
})
export class PreviewPageComponent implements AfterViewInit {

  config = input<PreviewPageConfig>();

  data = input<PrintDialogConfig>();

  @ViewChild('viewer', { static: true }) viewer: ElementRef<HTMLElement>;

  public readonly isLoading = signal(true);
  public readonly hasError = signal(false);
  public readonly errorMessage = signal<string | null>(null);
  public readonly zoom = signal(1);
  public readonly zoomPercent = computed(() => Math.round(this.zoom() * 100));

  private readonly exportService = inject(ExportService);
  private readonly markupService = inject(PrintMarkupService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly renderPreview$ = new Subject<void>();
  private readonly resizePreview$ = new Subject<void>();

  private pdfjs: PdfJsModule | null = null;
  private pdfLoadingTask: PDFDocumentLoadingTask | null = null;
  private pdfDoc: PDFDocumentProxy | null = null;
  private buffer: Buffer | null = null;
  private html: string | null = null;
  private renderTasks: RenderTask[] = [];
  private loadToken = 0;
  private renderToken = 0;
  private resizeObserver?: ResizeObserver;
  private lastWidth = 0;
  private viewReady = false;

  constructor() {
    effect(() => {
      this.data();
      this.config();

      if (this.viewReady) {
        this.renderPreview$.next();
      }
    });

    this.renderPreview$
      .pipe(
        debounceTime(150),
        switchMap(() => {
          this.isLoading.set(true);
          this.hasError.set(false);
          this.errorMessage.set(null);

          return this.generatePreview();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((buffer) => {
        if (!buffer) {
          this.isLoading.set(false);
          this.hasError.set(true);
          this.errorMessage.update((message) => message ?? 'Unable to generate PDF');
          return;
        }

        void this.loadPdf(buffer);
      });

    this.resizePreview$
      .pipe(
        debounceTime(150),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => void this.renderPages());

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.disposePdf();
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.observeResize();
    this.renderPreview$.next();
  }

  public get pdfBuffer(): Buffer | null {
    return this.buffer;
  }

  public get printableHtml(): string {
    return this.html ?? '';
  }

  public zoomIn(): void {
    this.setZoom(this.zoom() + ZOOM_STEP);
  }

  public zoomOut(): void {
    this.setZoom(this.zoom() - ZOOM_STEP);
  }

  public resetZoom(): void {
    this.setZoom(1);
  }

  private observeResize(): void {
    const element = this.viewer?.nativeElement;

    if (!element || typeof ResizeObserver === 'undefined') {
      return;
    }

    this.lastWidth = element.clientWidth;
    this.resizeObserver = new ResizeObserver((entries) => {
      const width = Math.round(entries[0].target.clientWidth);

      if (Math.abs(width - this.lastWidth) < 4) {
        return;
      }

      this.lastWidth = width;
      this.resizePreview$.next();
    });
    this.resizeObserver.observe(element);
  }

  private setZoom(value: number): void {
    const next = Math.round(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value)) * 100) / 100;

    if (next === this.zoom()) {
      return;
    }

    this.zoom.set(next);
    void this.renderPages();
  }

  private generatePreview(): Observable<Buffer | null> {
    return this.markupService
      .build(this.data(), this.config())
      .pipe(
        switchMap((html) => {
          this.html = html;
          return this.exportService.generatePDF(html, this.config().orientation);
        }),
        catchError((error) => {
          console.error('[PDF preview] generation failed', error);
          this.errorMessage.set(error instanceof Error ? error.message : String(error));
          return of(null);
        }),
      );
  }

  private async loadPdf(buffer: Buffer): Promise<void> {
    const token = ++this.loadToken;

    this.buffer = buffer;
    this.disposePdf();
    this.isLoading.set(true);
    this.hasError.set(false);

    try {
      const pdfjs = await this.getPdfJs();

      if (token !== this.loadToken) {
        return;
      }

      const bytes = new Uint8Array(buffer);

      const loadingTask = pdfjs.getDocument({ data: bytes.slice() });
      this.pdfLoadingTask = loadingTask;
      const doc = await loadingTask.promise;

      if (token !== this.loadToken) {
        void loadingTask.destroy();
        return;
      }

      this.pdfDoc = doc;
      await this.renderPages();
    } catch (error) {
      console.error('[PDF preview] loading failed', error);

      if (token === this.loadToken) {
        this.hasError.set(true);
        this.errorMessage.set(error instanceof Error ? error.message : String(error));
        this.isLoading.set(false);
      }
    }
  }

  private async getPdfJs(): Promise<PdfJsModule> {
    if (!this.pdfjs) {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(WORKER_SRC, document.baseURI).toString();
      this.pdfjs = pdfjs;
    }

    return this.pdfjs;
  }

  private async renderPages(): Promise<void> {
    const doc = this.pdfDoc;
    const container = this.viewer?.nativeElement;

    if (!doc || !container) {
      return;
    }

    const token = ++this.renderToken;
    this.cancelRenders();

    const styles = getComputedStyle(container);
    const availableWidth = container.clientWidth
      - parseFloat(styles.paddingLeft)
      - parseFloat(styles.paddingRight)
      - CANVAS_SHADOW_MARGIN * 2;

    if (availableWidth <= 0) {
      return;
    }

    const fragment = document.createDocumentFragment();
    const hadContent = container.childElementCount > 0;

    if (!hadContent) {
      this.isLoading.set(true);
    }

    try {
      for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
        if (token !== this.renderToken) {
          return;
        }

        const page = await doc.getPage(pageNumber);

        if (token !== this.renderToken) {
          return;
        }

        const baseViewport = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({
          scale: (availableWidth / baseViewport.width) * this.zoom(),
        });
        const outputScale = window.devicePixelRatio || 1;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          continue;
        }

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        canvas.className = 'preview-page__canvas';

        const pageWrapper = document.createElement('div');
        pageWrapper.className = 'preview-page__page';
        pageWrapper.appendChild(canvas);
        fragment.appendChild(pageWrapper);

        const renderTask = page.render({
          canvas,
          viewport,
          transform: [outputScale, 0, 0, outputScale, 0, 0],
        });
        this.renderTasks.push(renderTask);
        await renderTask.promise;

        if (token !== this.renderToken) {
          return;
        }
      }

      if (token !== this.renderToken) {
        return;
      }

      container.replaceChildren(fragment);
      this.isLoading.set(false);
    } catch (error) {
      if (this.isRenderCancelled(error)) {
        return;
      }

      console.error('[PDF preview] rendering failed', error);

      if (token === this.renderToken) {
        this.hasError.set(true);
        this.errorMessage.set(error instanceof Error ? error.message : String(error));
        this.isLoading.set(false);
      }
    }
  }

  private isRenderCancelled(error: unknown): boolean {
    return error instanceof Error && error.name === 'RenderingCancelledException';
  }

  private cancelRenders(): void {
    this.renderTasks.forEach((task) => task.cancel());
    this.renderTasks = [];
  }

  private disposePdf(): void {
    this.cancelRenders();
    this.viewer?.nativeElement?.replaceChildren();

    if (this.pdfLoadingTask) {
      void this.pdfLoadingTask.destroy();
      this.pdfLoadingTask = null;
    }

    this.pdfDoc = null;
  }
}
