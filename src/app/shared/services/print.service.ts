import { Injectable } from '@angular/core';

import { from, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ElectronService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  private print$: Subject<void> = new Subject();
  private readonly options= {
    pageSize: 'A4',
    printBackground: true,
    printSelectionOnly: false,
    landscape: false
  };

  constructor(
    private electronService: ElectronService,
  ) { }

  public print(name: string, path: string, printSection: string): Subject<void> {
    const fileName = `${name} (${(new Date().toLocaleDateString())}).pdf`;
    const pdfFilePath = this.electronService.path.join(path, fileName.replace(/\//g, '\u2215'));
    const win = new this.electronService.remote.BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });

    win.loadURL(`
    data:text/html;charset=utf-8,
    <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>MyYTitle</title> 
      <style type="text/css">
        @media print {
          * {
            font-family: Ubuntu;
          }

          .preview-page__title-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .currency__image {
            height: 18px;
          }

          .preview-page__cost-section {
            display: flex;
            align-items: center;
            font-size: 18px;
          }

          .preview-page__title,
          .preview-page__category-title {
            width: 60%;
          }

          .preview-page__category-section {
            margin-bottom: 18px;
          }

          .preview-page__app-title-container {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
          }

          .preview-page__app-title {
            margin: 0px;
          }

          .preview-page__cost {
            display: flex;
            align-items: center;
          }

          .preview-page__app-icon {
            height: 48px;
            margin-right: 12px;
          }

          .preview-page__divider {
            border-top: 1px solid black;
          }

          table {
            width: 100%;

            border: 1px solid gray;
            border-collapse: collapse;
          }

          th, td, th {
            border: 1px solid black;
            padding: 4pt;
            border-collapse: collapse;
          }

          td.mat-column-date,
          td.mat-column-cost,
          td.mat-column-mileage {
            white-space: nowrap;
          }

          .mat-column-date {
            width: 15%;
          }
      
          .mat-column-name {
            width: 35%;
          }
      
          .mat-column-notes {
            width: 20%;
          }
      
          .mat-column-mileage {
            width: 15%;
          }
      
          .mat-column-cost {
            width: 15%;
          }

          th {
            text-align: left;
          }
        }
      </style>
    </head>
    <body>${printSection}</body>
    `);

    win.webContents.on('did-finish-load', () => {
      from(win.webContents.printToPDF(this.options))
        .pipe(switchMap((data) => from(this.electronService.fs.promises.writeFile(pdfFilePath, data))))
        .subscribe(() => {
          this.electronService.shell.openPath(pdfFilePath);
          win.destroy();
          this.print$.next();
        });
    });

    return this.print$;
  }
}
