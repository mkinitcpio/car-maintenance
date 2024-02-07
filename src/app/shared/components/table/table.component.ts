import { Component, EventEmitter, Input, Output, ViewEncapsulation, inject, signal } from '@angular/core';
import { ColumnSchema, RowData, TableConfig } from './interfaces';
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

  @Input() set config(config: TableConfig) {
    this.tableConfig.set(config);
    this.columnSchemas.set(config.columnSchemas
      .sort((prev, curr) => prev.order - curr.order)
    );
  }

  @Input() set data(rows: T[]) {
    this.clearSelected();
    this.rows.set(rows);
  }

  @Output() edit: EventEmitter<string> = new EventEmitter();
  @Output() add: EventEmitter<void> = new EventEmitter();
  @Output() move: EventEmitter<string[]> = new EventEmitter();
  @Output() delete: EventEmitter<T> = new EventEmitter();
  @Output() exportToCSV: EventEmitter<string[][]> = new EventEmitter();
  @Output() exportToPDF: EventEmitter<void> = new EventEmitter();

  private csvService: CsvService = inject(CsvService);

  public columnSchemas = signal<ColumnSchema[]>([]);
  public rows = signal<T[]>([]);
  public tableConfig = signal<TableConfig>(defaultTableConfig);

  public selectedRows = new SelectionModel<string>(true);
  public allRowSelected = false;

  public onSelectionChange(id: string): void {
    if(this.tableConfig().actions.selectable) {
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
    this.columnSchemas.update((prevState) => {
      const schema = prevState.find(state => state.key === event.key);
      schema.visible = event.visible;

      return [...prevState];
    });
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
