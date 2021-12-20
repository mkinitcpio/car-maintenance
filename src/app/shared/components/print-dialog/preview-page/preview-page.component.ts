import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { ColumnConfig, PreviewPageConfig } from './preview-page-config';
import { Record } from '../../../../detail/state/interface';
import { ElectronService } from '../../../../core/services';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss'],
})
export class PreviewPageComponent implements AfterViewInit {

  @Input()
  config: PreviewPageConfig;

  @Input()
  records: Array<Record>;

  @ViewChild('print', { read: ElementRef }) print;

  public readonly dateFormat = 'd MMM, y';

  constructor(    private electronService: ElectronService,) { }

  ngAfterViewInit(): void {
    console.log(this.print.nativeElement.outerHTML);
    const options = {
      silent: false,
      printBackground: false,
      color: false,
      margin: {
        marginType: 'printableArea'
      },
      landscape: false,
      pagesPerSheet: 1,
      collate: false,
      copies: 1,
      header: 'Header of the Page',
      footer: 'Footer of the Page'
    };

    const win = new this.electronService.remote.BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    win.loadURL(`data:text/html;charset=utf-8,<head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>MyYTitle</title> <style type="text/css">
    @media print {
      table {
        border: 1px solid gray;
        border-collapse: collapse;
      }

      th, td, th {
        font-family: Ubuntu;
        border: 1px solid black;
        padding: 4pt;
        border-collapse: collapse;
      }

      td.mat-column-date,
      td.mat-column-cost,
      td.mat-column-mileage {
        white-space: nowrap;
      }

      th {
        text-align: left;
      }
    }
    </style></head> <body>${this.print.nativeElement.outerHTML}</body>`);

    win.webContents.on('did-finish-load', () => {
      win.webContents.executeJavaScript('window.print()');
    });
  }

  public trackById(columnConfig: ColumnConfig): string {
    return columnConfig.id;
  }

  get displayedColumns(): any {
    return this.config.columns.filter((column) => column.visible).map(c => c.id);
  }

}
