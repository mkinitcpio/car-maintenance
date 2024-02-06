import { Observable, from } from 'rxjs';
import { AppConfig } from '../../app.config';
import { ElectronService } from '@core/services';
import { SaveDialogReturnValue } from 'electron';

export type SaveDialogFileStatus = 'Cancel' | 'Success';

export abstract class AbstractExportService {

  constructor(
    protected appConfig: AppConfig,
    protected electronService: ElectronService,
  ) {}

  protected save(filePath: string, data: string): Observable<void> {
    return from(
      this.electronService.fs.promises.writeFile(
        filePath,
        data,
        { encoding: this.appConfig.fileEncoding }
      ),
    );
  }

  protected openSaveDialog(defaultPath?: string): Observable<SaveDialogReturnValue> {
    return from(
      this.electronService.dialog
        .showSaveDialog({
          defaultPath,
          properties: ['showOverwriteConfirmation']
        }),
    );
  }
}