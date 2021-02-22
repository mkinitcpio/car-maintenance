import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { languageOptions } from './language-options';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public languageOptions = languageOptions;
  public selectedLanguage: string = null;

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<SettingsComponent>,
    public settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.selectedLanguage = this.translate.getDefaultLang();
  }

  public onSelectLanguage(language: string): void {
    this.translate.setDefaultLang(language);
  }
}
