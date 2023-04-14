import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@shared/components/settings/settings.service';
import { ReleaseNotesService } from '../shared/components/release-notes/release-notes.service';
import { SideNavigationTrackerService } from './side-navigation-tracker.service';
import { CurrencyEnum } from '@shared/components/settings/currency.enum';
import { DialogManagerService } from '@shared/services/dialog-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private releaseNotesService: ReleaseNotesService,
    public sideNavTracker: SideNavigationTrackerService,
    private settingsService: SettingsService,
    private router: Router,
    private dialogManagerService: DialogManagerService,
  ) {}

  ngOnInit(): void {
    this.router.navigate([this.settingsService.settings.startPage]);
    if(this.releaseNotesService.isFirstAppStartAfterUpdate()) {
      this.releaseNotesService.showReleaseNotes().subscribe(() => {
        if(this.isSelectedCurrencyInvalid(this.settingsService.settings.units.currency)) {
          this.dialogManagerService.openCurrencyDialog().subscribe(() => {});
        }
      });
    }
  }

  private isSelectedCurrencyInvalid(currency: CurrencyEnum): boolean {
    return !CurrencyEnum[currency];
  }
}
