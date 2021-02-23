import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {DataBaseService} from "./core/database";
import {AutoCloseable} from "./core/auto-closeable";
import { SettingsService } from './shared/components/settings/settings.service';
import { ReleaseNotesService } from './shared/components/release-notes/release-notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AutoCloseable {

  public dbExist: boolean;

  constructor(
    private dataBaseService: DataBaseService,
    private settingsService: SettingsService,
    private releaseNotesService: ReleaseNotesService,
  ) {
    super();
    this.settingsService.init();

    this.dataBaseService.dbExist$.subscribe((exist) => {
      this.dbExist = exist;
    });

    if(this.releaseNotesService.isFirstAppStartAfterUpdate()) {
      this.releaseNotesService.showReleaseNotes();
    }

    this.dataBaseService.initDataBase();
  }
}
