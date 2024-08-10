import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, effect, inject, input, output } from '@angular/core';
import { RowData, TableConfig } from './interfaces';
import { defaultTableConfig } from './default-table-config';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

import { imports } from "./table.imports";
import { ColumnVisibilityEvent } from './column-selector/interfaces';

import { CsvService } from './services/csv.service';

@Component({
  standalone: true,
  selector: 'cm-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T extends RowData> {

  rows = input<T[]>([]);
  config = input<TableConfig>(defaultTableConfig);

  columnSchemas = computed(() => this.config().columnSchemas.sort(
    (prev, curr) => prev.order - curr.order)
  );

  emptyMessageWidth = computed(
    () => this.config().actions.selectable ? this.columnSchemas().length + 1 : this.columnSchemas().length
  );

  add = output<void>();
  edit = output<string>();
  move = output<string[]>();
  delete = output<T>();
  exportToCSV = output<string[][]>();
  exportToPDF = output<void>();
  columnVisibilityChange = output<string[]>();

  private csvService = inject(CsvService);

  public selectedRows = new SelectionModel<string>(true);
  public allRowSelected = false;
  public contextMenuId: string = null;

  constructor() {
    effect(() => {
      this.rows();
      this.clearSelected();
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

  public onAllRowToggle(event: MatCheckboxChange): void {
    this.allRowSelected = event.checked;

    if(event.checked) {
      this.selectedRows.select(...this.rows().map(row => row.id));
    } else {
      this.selectedRows.clear();
    }
  }

  public onEdit(id: string): void {
    this.edit.emit(id);
  }

  public onDelete(row: T): void {
    this.delete.emit(row);
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
}
