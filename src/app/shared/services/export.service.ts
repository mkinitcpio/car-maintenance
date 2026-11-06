import { Injectable, inject } from '@angular/core';
import { ElectronService } from '@core/services';
import { APP_CONFIG, AppConfig } from 'app/app.config';
import { Observable, from, map, of, switchMap } from 'rxjs';

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

  public generatePDF(body: string): Observable<Buffer> {
    return new Observable<Buffer>((subscriber) => {
      const printWindow = new this.electronService.remote.BrowserWindow({
        show: false,
        webPreferences: {
          nodeIntegration: true,
        }
      });

      const destroy = (): void => {
        if (!printWindow.isDestroyed()) {
          printWindow.destroy();
        }
      };

      printWindow.webContents.once('did-finish-load', () => {
        from(printWindow.webContents.printToPDF(this.options)).subscribe({
          next: (data) => {
            subscriber.next(data);
            subscriber.complete();
          },
          error: (error) => {
            console.error('[ExportService] printToPDF error', error);
            subscriber.error(error);
          },
        });
      });

      printWindow.webContents.once('did-fail-load', (_event, errorCode, errorDescription) => {
        console.error('[ExportService] did-fail-load', errorCode, errorDescription);
        subscriber.error(new Error(`Failed to generate PDF (${errorCode}): ${errorDescription}`));
      });

      printWindow.loadURL(getPDFTemplate("Title", body));

      return () => destroy();
    });
  }

  public savePDF(defaultPath: string, data: Buffer): Observable<SaveDialogData> {
    return this.openSaveDialog(defaultPath).pipe(
      switchMap((dialog) => {
        if(dialog.canceled) {
          return of({
            status: 'Cancel'
          } as SaveDialogData);
        }

        const path = dialog.filePath;

        return this.save(path, data).pipe(
          map(() => ({
            status: 'Success',
            filePath: path,
          }) as SaveDialogData),
        );
      }),
    );
  }

  public toPDF(defaultPath: string, body: string): Observable<SaveDialogData> {
    return this.generatePDF(body).pipe(
      switchMap((data) => this.savePDF(defaultPath, data)),
    );
  }
}
