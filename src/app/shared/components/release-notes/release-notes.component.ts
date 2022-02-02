import { Inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { SettingsService } from '../settings/settings.service';

interface SlideShow {
  links: string[];
  notes: string[];
  selected: number;
}
@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {

  public appLanguage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public releaseNotes: any,
    public dialogRef: MatDialogRef<CreateRecordComponent>,
    public settingsService: SettingsService,
  ) {
  }

  ngOnInit(): void {
    this.appLanguage = this.settingsService.settings.language === 'it' ? 'en' : this.settingsService.settings.language;
  }

  progressSlideShowSection: SlideShow = {
    links: [
      'assets/release-notes/1.0.0.png',
      'assets/release-notes/2.0.0.png',
      'assets/release-notes/3.0.0.png',
    ],
    notes: [
      "v1.0.0",
      "v2.0.0",
      "v3.0.0",
    ],
    selected: 0,
  };

  carSlideShowSection: SlideShow = {
    links: [
      'assets/release-notes/car-1.png',
      'assets/release-notes/car-2.png',
    ],
    notes: [],
    selected: 0,
  };

  colorSlideShowSection: SlideShow = {
    links: [
      'assets/release-notes/color-purple.png',
      'assets/release-notes/color-red.png',
    ],
    notes: [],
    selected: 0,
  };

  public onSlideShowChange(section: SlideShow, direction: number): void {
    const possiblePosition = section.selected + direction;

    if(possiblePosition === section.links.length) {
      section.selected = 0;
      return;
    }

    if(possiblePosition < 0) {
      section.selected = section.links.length - 1;
      return;
    }

    section.selected = possiblePosition;
  }
}
