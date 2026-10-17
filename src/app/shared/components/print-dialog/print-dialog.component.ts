import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { CurrencyComponent } from '../../currency/currency.component';
import { CmTextBody } from '../typography/text-body/text-body';
import { DialogComponent } from '../dialog/dialog.component';
import { SwitchComponent } from '../switch/switch.component';
import { CmCheckbox } from '../checkbox/checkbox';
import { CmButton } from '../button/button';
import { ContentContainerComponent } from '../content-container/content-container.component';
import { ButtonComponent } from '../button/button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UbuntuContainerComponent } from '../../ubuntu/ubuntu-container/ubuntu-container.component';
import { NumberSeparatorPipe } from '../../pipes/number-separator.pipe';
import { LocalizedDatePipe } from '../../pipes/localized-date.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ColumnConfig, PreviewPageConfig } from './preview-page/preview-page-config';

import { ElectronService } from '@core/services';

import { defaultColumns } from './preview-page/default-columns';
import { PrintDialogConfig } from './print-dialog-config';
import { ExportService } from '@shared/services/export.service';
import { SaveDialogData } from '@shared/services/abstract-export.service';

@Component({
    selector: 'app-print-dialog',
    templateUrl: './print-dialog.component.html',
    styleUrls: ['./print-dialog.component.scss'],
    imports: [
        CommonModule,
        DragDropModule,
        MatIconModule,
        MatDividerModule,
        TranslateModule,
        MatProgressSpinnerModule,
        MatTableModule,
        LocalizedDatePipe,
        NumberSeparatorPipe,
        UbuntuContainerComponent,
        MatTooltipModule,
        MatSlideToggleModule,
        ButtonComponent,
        ContentContainerComponent,
        CmButton,
        CmCheckbox,
        SwitchComponent,
        DialogComponent,
        CmTextBody,
        CurrencyComponent,
        PreviewPageComponent,
    ]
})
export class PrintDialogComponent implements OnInit {

  private exportService: ExportService = inject(ExportService);

  private readonly MAX_RECORDS_FOR_PREVIEW = 5;

  public columns: Array<ColumnConfig> = [];
  public config: PreviewPageConfig = null;
  public saveDirectoryPath: string = this.electronService.os.homedir();

  @ViewChild('print', { read: ElementRef, static: false }) print;

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
    this.config = {
      showTablesCostResult: true,
      columns: this.columns,
    };
  }

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  public onPrint(): void {
    const title = this.data.multiply ? this.data.title : this.data.tablesData[0].title;
    const defaultFileName = `${title} (${(new Date().toLocaleDateString())}).pdf`.replace(/\//g, '\u2215');

    this.exportService
      .toPDF(defaultFileName, this.print.nativeElement.outerHTML as string)
      .subscribe((data) => data.filePath && this.dialogRef.close(data));
  }
}
