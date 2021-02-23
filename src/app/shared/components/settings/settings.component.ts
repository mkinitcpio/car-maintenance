import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { languageOptions } from './language-options';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public languageOptions = languageOptions;

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    public settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
  }

  public onSelectLanguage(language: string): void {
    this.settingsService.setAppLanguage(language);
    this.settingsService.saveSettings();
  }

  public onSelectRegion(region: string): void {
    this.settingsService.setRegion(region);
    this.settingsService.saveSettings();
  }
}
