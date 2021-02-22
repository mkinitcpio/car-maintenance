import { Component, OnInit } from '@angular/core';
import { ReleaseNotesService } from '../shared/components/release-notes/release-notes.service';
import { SettingsService } from '../shared/components/settings/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private releaseNotesService: ReleaseNotesService,
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {
    this.settingsService.init();
    if(this.releaseNotesService.isFirstAppStartAfterUpdate()) {
      this.releaseNotesService.showReleaseNotes();
    }
  }
}
