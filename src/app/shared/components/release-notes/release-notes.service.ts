import { inject, Injectable } from '@angular/core';
import { ElectronService } from '../../../core/services';
import { DialogManagerService } from '../../../shared/services/dialog-manager.service';
import { ReleaseNotes } from './interface';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from 'app/app.config';
const releaseNotes = require('../../../release-notes.json');

@Injectable({
  providedIn: 'root'
})
export class ReleaseNotesService {
  public releaseNotes: ReleaseNotes = null;

  private electronService = inject(ElectronService);
  private dialogManagerService = inject(DialogManagerService);
  private appConfig = inject<AppConfig>(APP_CONFIG);

  constructor() {

  }

  public isFirstAppStartAfterUpdate(): boolean {
    this.releaseNotes = releaseNotes as ReleaseNotes;
    const version = this.appConfig.version;
    let showChangeLog = false;

    const changeLog = this.electronService.changelog;

    if(changeLog.version < version || (changeLog.version === version && !changeLog.isShown)) {
      showChangeLog = true;
    }

    return showChangeLog;
  }

  public showReleaseNotes(): Observable<void> {
    this.updateChangeLogConfig(this.appConfig.version, true);
    return this.dialogManagerService.openReleaseNotesDialog(this.releaseNotes);
  }

  private updateChangeLogConfig(version: string, isShown: boolean): void {
    const changeLogConfig = {
      version,
      isShown,
    };
    this.electronService.setChangelogData(changeLogConfig);
  }
}
