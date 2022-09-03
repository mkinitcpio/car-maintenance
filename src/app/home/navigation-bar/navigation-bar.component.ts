import { Component } from '@angular/core';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { SideNavigationTrackerService } from '../side-navigation-tracker.service';
import { AppConfig } from 'environments/environment';
import { ElectronService } from '@core/services/electron/electron.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  public AppConfig = AppConfig;

  constructor(
    public sideNavTracker: SideNavigationTrackerService,
    private dialogManagerService: DialogManagerService,
    private electronService: ElectronService,
  ) { }

  public openSettings(): void {
    this.dialogManagerService.openSettingsDialog();
  }

  public onOpenAccount(): void {
    this.dialogManagerService.openAccountDialog();
  }

  public onRefreshApp(): void {
    window.location.reload();
  }

  public onOpenDevTools(): void {
    this.electronService.remote.getCurrentWindow().webContents.openDevTools();
  }
}
