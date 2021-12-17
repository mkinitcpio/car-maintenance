import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ColumnConfig, PreviewPageConfig } from './preview-page/preview-page-config';
import { defaultColumns } from './preview-page/default-columns';
import { Record } from '../../../detail/state/interface';

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.scss'],
})
export class PrintDialogComponent implements OnInit {

  public columns: Array<ColumnConfig> = [];
  public config: PreviewPageConfig = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public records: Array<Record>,
    public dialogRef: MatDialogRef<PrintDialogComponent>,
  ) {
  }

  ngOnInit(): void {
    this.columns = [...defaultColumns.map(column =>  ({...column}))];
    this.config = {
      columns: this.columns,
    };
  }

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
