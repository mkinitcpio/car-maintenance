import { Inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { SettingsService } from '../settings/settings.service';

interface ReleaseNote {
  dashboard: string;
  welcomePage: string;
  settings: string;
  progress: {
    [key: number]: string;
  };
}

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {
  public releaseNote: ReleaseNote;

  constructor(
    @Inject(MAT_DIALOG_DATA) public releaseNotes: any,
    public dialogRef: MatDialogRef<CreateRecordComponent>,
    public settingsService: SettingsService,
  ) {
  }

  ngOnInit(): void {
    this.releaseNote = this.releaseNotes[this.settingsService.settings.language === 'it' ? 'en' : this.settingsService.settings.language];
  }
}
