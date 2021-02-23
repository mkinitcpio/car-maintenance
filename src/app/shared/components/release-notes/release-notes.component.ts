import { Inject, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { SettingsService } from '../settings/settings.service';
import { ReleaseNotes } from './interface';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {

  @ViewChild('versionSelect', {static: true})
  versionSelect: MatSelect;

  public releases: string[] = [];
  public selectedVersion: string = null;
  public appLanguage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public releaseNotes: ReleaseNotes,
    public dialogRef: MatDialogRef<CreateRecordComponent>,
    public settingsService: SettingsService,
  ) {
    this.releases = this.releaseNotes.releases;
    this.selectedVersion = this.releases[0];
  }

  ngOnInit(): void {
    this.versionSelect.valueChange.subscribe((version: string) => {
      this.selectedVersion = version;
    });

    this.appLanguage = this.settingsService.settings.language;
  }
}
