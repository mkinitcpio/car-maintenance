import { inject, Inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { SettingsService } from '../settings/settings.service';
import { AppConfig, APP_CONFIG } from 'app/app.config';

interface ReleaseNote {
  title: string;
  news: string[];
};

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {

  public appConfig = inject<AppConfig>(APP_CONFIG);
  public dialogRef = inject(MatDialogRef<CreateRecordComponent>);

  private settingsService = inject(SettingsService);
  private releaseNotesData = inject<{[key: string]: ReleaseNote[]}>(MAT_DIALOG_DATA);

  public releaseNotes: ReleaseNote[];

  constructor() {

  }

  ngOnInit(): void {
    this.releaseNotes = this.releaseNotesData[this.settingsService.settings.language];
  }
}
