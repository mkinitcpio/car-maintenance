import { Injectable } from '@angular/core';
import { ElectronService } from '../../../core/services';
import { DialogManagerService } from '../../../shared/services/dialog-manager.service';
import { ReleaseNotes } from './interface';
import { Observable } from 'rxjs';
const packageJson= require('../../../../../package.json');
const releaseNotes = require('../../../release-notes.json');

@Injectable({
  providedIn: 'root'
})
export class ReleaseNotesService {

  public readonly changeLogPath: string = this.electronService.os.homedir() + '/.config/Учет/changelog.json';

  public releaseNotes: ReleaseNotes = null;

  private fileReadConfig: {
    flag: 'r',
    encoding: 'utf8',
  };
  private fileWriteConfig: {
    encoding: 'utf8',
    flag: 'w',
  };

  constructor(
    private electronService: ElectronService,
    private dialogManagerService: DialogManagerService,
  ) {}

  public isFirstAppStartAfterUpdate(): boolean {
    this.releaseNotes = releaseNotes as ReleaseNotes;
    const { version } = packageJson;
    let showChangeLog = false;
    const configExist = this.electronService.fs.existsSync(this.changeLogPath);

    if(configExist) {
      const changeLog = JSON.parse(this.electronService.fs.readFileSync(this.changeLogPath, this.fileReadConfig));

      if(changeLog.version < version || (changeLog.version === version && !changeLog.isShown)) {
        showChangeLog = true;
      }
    } else {
      showChangeLog = true;
      this.updateChangeLogConfig(version, false);
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

    this.electronService.fs.writeFileSync(this.changeLogPath, JSON.stringify(changeLogConfig), this.fileWriteConfig);
  }
}
