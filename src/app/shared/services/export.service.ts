import { Injectable, inject } from '@angular/core';
import { ElectronService } from '@core/services';
import { APP_CONFIG, AppConfig } from 'app/app.config';
import { Observable, map, of, switchMap } from 'rxjs';

import { AbstractExportService, SaveDialogFileStatus } from './abstract-export.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService extends AbstractExportService {

  constructor() {
    super(
      inject<AppConfig>(APP_CONFIG),
      inject(ElectronService),
    );
  }

  public toCSV(tableData: string[][], defaultPath?: string): Observable<SaveDialogFileStatus> {
    return this.openSaveDialog(defaultPath).pipe(
      switchMap((dialog) => {
        if(dialog.canceled) {
          return of('Cancel' as SaveDialogFileStatus);
        }

        const path = dialog.filePath;
        const parsedData = this.parseCsvDataToString(tableData);

        return this.save(path, parsedData).pipe(
          map(() => 'Success' as SaveDialogFileStatus),
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
}