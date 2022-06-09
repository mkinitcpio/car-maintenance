import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { SideNavigationTrackerService } from '../side-navigation-tracker.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor(
    public sideNavTracker: SideNavigationTrackerService,
    private dialogManagerService: DialogManagerService,
    private router: Router,
  ) { }

  public openSettings(): void {
    this.dialogManagerService.openSettingsDialog();
  }

  public onDashboardClick(): void {
    this.router.navigate(['/']);
  }
}
