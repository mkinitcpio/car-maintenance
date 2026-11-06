import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { CmTextBody } from '../typography/text-body/text-body';
import { DialogComponent } from '../dialog/dialog.component';
import { SwitchComponent } from '../switch/switch.component';
import { CmCheckbox } from '../checkbox/checkbox';
import { CmButton } from '../button/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ColumnConfig, PreviewPageConfig } from './preview-page/preview-page-config';

import { ElectronService } from '@core/services';

import { defaultColumns } from './preview-page/default-columns';
import { PrintDialogConfig } from './print-dialog-config';
import { ExportService } from '@shared/services/export.service';
import { SaveDialogData } from '@shared/services/abstract-export.service';
import { Accordion } from '../accordion/accordion';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-print-dialog',
    templateUrl: './print-dialog.component.html',
    styleUrls: ['./print-dialog.component.scss'],
    imports: [
        CommonModule,
        DragDropModule,
        MatIconModule,
        MatDividerModule,
        TranslateModule,
        CmButton,
        CmCheckbox,
        SwitchComponent,
        DialogComponent,
        CmTextBody,
        PreviewPageComponent,
        Accordion,
    ]
})
export class PrintDialogComponent implements OnInit {

  private exportService: ExportService = inject(ExportService);

  private readonly MAX_RECORDS_FOR_PREVIEW = 5;

  public columns: Array<ColumnConfig> = [];
  public config = signal<PreviewPageConfig>(null);
  public orientation = signal<'horizontal' | 'vertical'>('vertical');
  public saveDirectoryPath: string = this.electronService.os.homedir();

  @ViewChild('print', { read: PreviewPageComponent, static: false }) preview: PreviewPageComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PrintDialogConfig,
    public dialogRef: MatDialogRef<PrintDialogComponent, SaveDialogData>,
    private electronService: ElectronService,
  ) {
  }

  ngOnInit(): void {
    this.data.tablesData = this.data.tablesData.filter(table => table.records.length);
    this.data.tablesData
      .forEach(table => {
        table.records = table.records.slice(0, this.MAX_RECORDS_FOR_PREVIEW);
      });

    this.columns = [...defaultColumns.map(column =>  ({...column}))];
    this.config.set({
      showTablesCostResult: true,
      orientation: this.orientation(),
      columns: this.columns,
    });
  }

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.config.update((config) => {
      config.columns = this.columns;

      return { ...config };
    });
  }

  public toggleColumn(column: ColumnConfig): void {
    column.visible = !column.visible;

    this.config.update((config) => ({ ...config, columns: [...config.columns] }));
  }

  public toggleTotal(): void {
    this.config.update((config) => ({
      ...config,
      showTablesCostResult: !config.showTablesCostResult,
    }));
  }

  public onPrint(): void {
    if (!this.preview) {
      return;
    }

    const title = this.data.multiply ? this.data.title : this.data.tablesData[0].title;
    const defaultFileName = `${title} (${(new Date().toLocaleDateString())}).pdf`.replace(/\//g, '\u2215');

    const request$ = this.preview.pdfBuffer
      ? this.exportService.savePDF(defaultFileName, this.preview.pdfBuffer)
      : this.exportService.toPDF(defaultFileName, this.preview.printableHtml, this.orientation());

    request$.subscribe((data) => data.filePath && this.dialogRef.close(data));
  }

  public onOrientationChange(orientation: 'vertical' | 'horizontal'): void {
    if(orientation !== this.orientation()) {
      this.orientation.update((value) => orientation === value ? value : orientation);

      this.config.update((config) => {
        config.columns = this.columns;

        return { ...config, orientation };
      });
    }

  }
}
