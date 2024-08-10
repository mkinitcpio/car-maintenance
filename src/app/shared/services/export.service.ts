import { Injectable, inject } from '@angular/core';
import { ElectronService } from '@core/services';
import { APP_CONFIG, AppConfig } from 'app/app.config';
import { Observable, Subject, from, map, of, switchMap, take } from 'rxjs';

import { AbstractExportService, SaveDialogData } from './abstract-export.service';

import { getPDFTemplate } from './records-pdf.template';
import { PrintToPDFOptions } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ExportService extends AbstractExportService {

  private readonly options: PrintToPDFOptions = {
    pageSize: "A4",
    printBackground: true,
    landscape: true,
  };

  constructor() {
    super(
      inject<AppConfig>(APP_CONFIG),
      inject(ElectronService),
    );
  }

  public toCSV(tableData: string[][], defaultPath?: string): Observable<SaveDialogData> {
    return this.openSaveDialog(defaultPath).pipe(
      switchMap((dialog) => {
        if(dialog.canceled) {
          return of({
            status: 'Cancel'
          } as SaveDialogData);
        }

        const path = dialog.filePath;
        const parsedData = this.parseCsvDataToString(tableData);

        return this.save(path, parsedData).pipe(
          map(() => ({
            status: 'Success',
            filePath: path,
          }) as SaveDialogData),
        );
      }),
    );
  }

  private parseCsvDataToString(data: string[][]): string {
    const parsedData = data
      .map((row) => row.map(r => `"${r}"`).join(','))
      .join('\n');

    return parsedData;
  }

  public toPDF(defaultPath: string, body: string): Observable<SaveDialogData> {
    const print$: Subject<[filePath: string, data: Buffer]> = new Subject();

    return this.openSaveDialog(defaultPath).pipe(
      switchMap((dialog) => {
        if(dialog.canceled) {
          return of({
            status: 'Cancel'
          } as SaveDialogData);
        }

        const path = dialog.filePath;
        const pdf = getPDFTemplate(body);

        const printWindow = new this.electronService.remote.BrowserWindow({
          show: false,
          webPreferences: {
            nodeIntegration: true,
          }
        });

        printWindow.loadURL(pdf);

        printWindow.webContents.on('did-finish-load', () => {
          from(printWindow.webContents.printToPDF(this.options))
            .subscribe((data) => {
              printWindow.destroy();
              print$.next([path, data]);
            });
        });

        return print$.pipe(
          take(1),
          switchMap(([filePath, data]) => {
            return this.save(filePath, data).pipe(
              map(() => ({
                status: 'Success',
                filePath,
              }) as SaveDialogData
              ));
          }),
        );
      }),
    );
  }
}