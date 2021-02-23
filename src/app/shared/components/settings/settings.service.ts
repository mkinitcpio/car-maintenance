
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ElectronService } from '../../../core/services';
import { Settings } from './interface';

import { LanguageEnum } from './language-enum';
import { LocaleEnum } from './locale-enum';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public settings: Settings;

  private readonly appConfFolder: string = this.electronService.os.homedir() + '/.config/Учет';
  private readonly settingsPath: string = this.electronService.os.homedir() + '/.config/Учет/settings.json';
  private readonly oldConfigPath: string = this.electronService.os.homedir() + '/.config/Учет/conf';
  private readonly defaultSettings : Settings = null;

  constructor(private electronService: ElectronService, private translate: TranslateService) {
    this.defaultSettings = {
      language: this.translate.getBrowserLang(),
      databasePath: null,
      region: this.translate.getBrowserLang(),
    };
  }

  public init(): void {
    const confExist = this.electronService.fs.existsSync(this.appConfFolder);
    const settingsExist = this.electronService.fs.existsSync(this.settingsPath);
    const oldConfigExist = this.electronService.fs.existsSync(this.oldConfigPath);

    // Need for migration 1.3.1 => 2.0.0
    if(oldConfigExist) {
      const databasePath = this.electronService.fs.readFileSync(this.oldConfigPath, 'utf8');

      this.defaultSettings.databasePath = databasePath;
      this.electronService.fs.unlinkSync(this.oldConfigPath);
    }

    if(!confExist) {
      this.electronService.fs.mkdirSync(this.appConfFolder, { recursive: true });
    }

    if(settingsExist) {
      this.settings = JSON.parse(this.electronService.fs.readFileSync(this.settingsPath, 'utf8'));
    } else {
      const translateExist = this.translate.getLangs().includes(this.defaultSettings.language);

      if(!translateExist) {
        this.defaultSettings.language = LanguageEnum.En;
        this.defaultSettings.region = LocaleEnum.Us;
      } else {
        if(this.defaultSettings.language === LanguageEnum.En) {
          this.defaultSettings.region = LocaleEnum.Us;
        }
      }

      this.settings = this.defaultSettings;
      this.saveSettings();
    }
    this.setAppLanguage(this.settings.language);
  }

  public setAppLanguage(lang: string): void {
    this.settings.language = lang;
    this.translate.setDefaultLang(lang);
  }

  public setRegion(region: string): void {
    this.settings.region = region;
  }

  public setDataBasePath(path: string): void {
    this.settings.databasePath = path;
  }

  public saveSettings(): void {
    this.electronService.fs.writeFileSync(this.settingsPath, JSON.stringify(this.settings), { encoding: 'utf8'});
  }
}
