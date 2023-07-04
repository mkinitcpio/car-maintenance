import { Injectable } from '@angular/core';
import { ElectronService } from '../../../core/services';
import { DialogManagerService } from '../../../shared/services/dialog-manager.service';
import { ReleaseNotes } from './interface';
import { Observable } from 'rxjs';
const packageJson = require('../../../../../package.json') as { version: string };
const releaseNotes = require('../../../release-notes.json');

@Injectable({
  providedIn: 'root'
})
export class ReleaseNotesService {
  public releaseNotes: ReleaseNotes = null;

  constructor(
    private electronService: ElectronService,
    private dialogManagerService: DialogManagerService,
  ) {}

  public isFirstAppStartAfterUpdate(): boolean {
    this.releaseNotes = releaseNotes as ReleaseNotes;
    const { version } = packageJson;
    let showChangeLog = false;

    const changeLog = this.electronService.changelog;

    if(changeLog.version < version || (changeLog.version === version && !changeLog.isShown)) {
      showChangeLog = true;
    }

    return showChangeLog;
  }

  public showReleaseNotes(): Observable<void> {
    this.updateChangeLogConfig(packageJson.version, true);
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
