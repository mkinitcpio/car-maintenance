import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ColumnConfig, PreviewPageConfig } from './preview-page/preview-page-config';

import { ElectronService } from '@core/services';

import { defaultColumns } from './preview-page/default-columns';
import { PrintDialogConfig } from './print-dialog-config';
import { PrintService } from '../../services/print.service';

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.scss'],
})
export class PrintDialogComponent implements OnInit {

  private readonly MAX_RECORDS_FOR_PREVIEW = 5;

  public columns: Array<ColumnConfig> = [];
  public config: PreviewPageConfig = null;
  public saveDirectoryPath: string = this.electronService.os.homedir();

  @ViewChild('print', { read: ElementRef, static: false }) print;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PrintDialogConfig,
    public dialogRef: MatDialogRef<PrintDialogComponent>,
    public printService: PrintService,
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
    this.config = {
      showTablesCostResult: true,
      columns: this.columns,
    };
  }

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  public onPrint(): void {
    const fileName = this.data.multiply ? this.data.title : this.data.tablesData[0].title;

    this.printService
      .print(fileName, this.saveDirectoryPath, this.print.nativeElement.outerHTML as string)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  public onEditFilePath(): void {
    this.electronService.dialog
      .showOpenDialog({properties: ['openDirectory']})
      .then((data) => {
        if(data.filePaths.length) {
          const newPath = data.filePaths[0];
          this.saveDirectoryPath = newPath;
        }
      });
  }
}
