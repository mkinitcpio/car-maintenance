import { Component, OnInit } from '@angular/core';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { AppConfig } from 'environments/environment';
import { ElectronService } from '@core/services/electron/electron.service';
import { NavigationEnd, Router } from '@angular/router';

import { NavigationButton } from './interfaces';
import { navigationButtons } from './navigation-buttons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  public AppConfig = AppConfig;
  public navigationButtons: NavigationButton[] = navigationButtons;
  public currentRoute = '';
  public defaultRoute = 'maintenance';

  constructor(
    private dialogManagerService: DialogManagerService,
    private electronService: ElectronService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.navigate([this.defaultRoute]);

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

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
