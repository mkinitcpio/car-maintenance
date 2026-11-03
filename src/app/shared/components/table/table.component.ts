import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewEncapsulation, afterNextRender, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { RowData, TableConfig } from './interfaces';
import { defaultTableConfig } from './default-table-config';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

import { imports } from "./table.imports";
import { ColumnVisibilityEvent } from './column-selector/interfaces';

import { CsvService } from './services/csv.service';

const SCROLL_STEP_RATIO = 0.8;
const SCROLL_EDGE_EPSILON = 1;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'cm-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T extends RowData> implements OnDestroy {

  rows = input<T[]>([]);
  config = input<TableConfig>(defaultTableConfig);
  transparent = input<boolean>(false);

  columnSchemas = computed(() => this.config().columnSchemas.sort(
    (prev, curr) => prev.order - curr.order)
  );

  emptyMessageWidth = computed(
    () => this.config().actions.selectable ? this.columnSchemas().length + 1 : this.columnSchemas().length
  );

  add = output<void>();
  edit = output<string>();
  move = output<string[]>();
  delete = output<string[]>();
  exportToCSV = output<string[][]>();
  exportToPDF = output<void>();
  columnVisibilityChange = output<string[]>();

  tableScrollable = signal(false);
  canScrollLeft = signal(false);
  canScrollRight = signal(false);

  private tableSection = viewChild.required<ElementRef<HTMLElement>>('tableSection');
  private table = viewChild.required<ElementRef<HTMLTableElement>>('table');
  private resizeObserver: ResizeObserver | null = null;

  private csvService = inject(CsvService);

  public selectedRows = new SelectionModel<string>(true);
  public allRowSelected = false;
  public contextMenuId: string | null = null;

  constructor() {
    effect(() => {
      this.rows();
      this.clearSelected();
    });

    afterNextRender(() => {
      this.resizeObserver = new ResizeObserver(() => this.updateScrollState());
      this.resizeObserver.observe(this.tableSection().nativeElement);
      this.resizeObserver.observe(this.table().nativeElement);
      this.updateScrollState();
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  public onSectionScroll(): void {
    this.updateScrollState();
  }

  public onScrollTable(direction: -1 | 1): void {
    const section = this.tableSection().nativeElement;

    section.scrollBy({
      left: direction * section.clientWidth * SCROLL_STEP_RATIO,
      behavior: 'smooth',
    });
  }

  public onSelectionChange(id: string): void {
    if(this.config().actions.selectable) {
      this.selectedRows.toggle(id);
      this.allRowSelected = this.selectedRows.selected.length === this.rows().length;
    }
  }

  public get someRowSelected(): boolean {
    return this.selectedRows.hasValue() && !this.allRowSelected;
  }

  public onAllRowToggle(checked: boolean): void {
    this.allRowSelected = checked;

    if(checked) {
      this.selectedRows.select(...this.rows().map(row => row.id));
    } else {
      this.selectedRows.clear();
    }
  }

  public onEdit(id: string): void {
    this.edit.emit(id);
  }

  public onDelete(row?: T): void {
    const selectedRows  = this.selectedRows.hasValue()
      ? this.selectedRows.selected
      : [row.id];

    this.delete.emit(selectedRows);
  }

  public onMove(): void {
    this.move.emit(this.selectedRows.selected);
  }

  public onExportToPDF(): void {
    this.exportToPDF.emit();
  }

  public onColumnVisibilityChanged(event: ColumnVisibilityEvent): void {
    const hiddenColumns = this.columnSchemas()
      .map(schema => {
        if(schema.key === event.key) {
          schema.visible = event.visible;
        }
        return schema;
      })
      .filter(schema => !schema.visible)
      .map(schema => schema.key);

    this.columnVisibilityChange.emit(hiddenColumns);
  }

  public onExportToCSV(header: HTMLElement, table: HTMLElement): void {
    const csvData = this.csvService.parse(header, table);
    this.exportToCSV.emit(csvData);
  }

  private clearSelected(): void {
    this.selectedRows.clear();
    this.allRowSelected = false;
  }

  private updateScrollState(): void {
    const section = this.tableSection().nativeElement;
    const maxScrollLeft = section.scrollWidth - section.clientWidth;

    this.tableScrollable.set(maxScrollLeft > 0);
    this.canScrollLeft.set(section.scrollLeft > SCROLL_EDGE_EPSILON);
    this.canScrollRight.set(section.scrollLeft < maxScrollLeft - SCROLL_EDGE_EPSILON);
  }
}
