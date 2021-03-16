import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IconTypeEnum } from './icon-type.enum';

import { languageOptions } from './language-options';
import { LocaleEnum } from './locale-enum';
import { regionOptions } from './region-options';

import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {

  public languageOptions = languageOptions;
  public regionOptions = regionOptions;
  public IconTypeEnum = IconTypeEnum;

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

  public onSelectRegion(region: LocaleEnum): void {
    this.settingsService.setRegion(region);
    this.settingsService.saveSettings();
  }

  public onColorSelect(event: MatSlideToggleChange): void {
    this.settingsService.setIconType(event.checked ? IconTypeEnum.Mono : IconTypeEnum.Color);
    this.settingsService.saveSettings();
  }
}
