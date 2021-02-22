
import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ElectronService } from '../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private fileReadConfig: {
    flag: 'r',
    encoding: 'utf8',
  };

  public dataBasePath: string = null;

  private readonly confPath: string = this.electronService.os.homedir() + '/.config/Учет/conf';
  constructor(private electronService: ElectronService) {}

  public init(): void {
    this.dataBasePath = this.electronService.fs.readFileSync(this.confPath, 'utf8');
  }


}
