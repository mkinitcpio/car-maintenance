import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ElectronService } from "../../../core/services";
import { CurrencyEnum } from "./currency.enum";
import { AppearanceType, Settings } from "./interface";

import { LocaleEnum } from "./locale-enum";
import { MetricSystemEnum } from "./metric-system.enum";
import { NavigationTabEnum } from "./navigation-tab.enum";
import { SettingsTypeEnum } from "./settings-type.enum";
import { ColorEnum } from "./colors-enum";
import { NavigationEnum } from "app/home/navigation-bar/navigation.enum";
import { SettingsPaths } from './settings-paths';
import { defaultSettings } from './default-settings';

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  public get settings(): Settings {
    return this.electronService.appSettings.store;
  }

  private readonly settingsPath: string = this.electronService.combineAppConfigsPath(
    this.electronService.getAppConfigFolderPath(),
    "settings.json",
  );

  public  selected:string;

  public settingsChanged$: BehaviorSubject<{
    type: SettingsTypeEnum;
    value?: any;
  }> = new BehaviorSubject({ type: SettingsTypeEnum.All });
  public animationsStateChanged$: Subject<boolean> = new Subject();

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
  ) {
  }

  public init(): void {
    const isSettingsEmpty = !this.electronService.appSettings.size;

    if(isSettingsEmpty) {
      const oldSettingsExist = this.electronService.fs.existsSync(this.settingsPath);
      if(oldSettingsExist) {
        this.migrateToNewSettings();
      } else {
        this.electronService.setAppSettingsData(defaultSettings);
      }
    }

    this.setAppLanguage(this.settings.language);
    this.animationsStateChanged$.next(this.settings.appearance.animations);
    this.settingsChanged$.next({
      type: SettingsTypeEnum.Color,
      value: this.settings.appearance.primaryColor,
    });

    this.settingsChanged$.next({
      type: SettingsTypeEnum.Scheme,
      value: this.settings.appearance.appearance,
    });
  }

  public setAppLanguage(lang: string): void {
    this.settings.language = lang;
    this.electronService.appSettings.set(SettingsPaths.Language, lang);
    this.translate.setDefaultLang(lang);
  }

  public setAnimations(state: boolean): void {
    this.electronService.appSettings.set(SettingsPaths.Animations, state);
    this.animationsStateChanged$.next(state);
  }

  public setRegion(region: LocaleEnum): void {
    this.electronService.appSettings.set(SettingsPaths.Region, region);
  }

  public setDataBasePath(path: string): void {
    this.electronService.appSettings.set(SettingsPaths.DatabasePath, path);
    this.settingsChanged$.next({
      type: SettingsTypeEnum.Database,
    });
  }

  public setStartPage(navigationRoute: NavigationEnum): void {
    this.electronService.appSettings.set(SettingsPaths.StartPage, navigationRoute);
  }

  public setMetricSystem(metricSystem: MetricSystemEnum): void {
    this.electronService.appSettings.set(SettingsPaths.MetricSystem, metricSystem);
    this.settingsChanged$.next({
      type: SettingsTypeEnum.Database,
    });
  }

  public setCurrency(currency: CurrencyEnum): void {
    this.electronService.appSettings.set(SettingsPaths.Currency, currency);
    this.settingsChanged$.next({
      type: SettingsTypeEnum.Database,
    });
  }

  public setFirstTab(tab: NavigationTabEnum): void {
    this.electronService.appSettings.set(SettingsPaths.FirstTab, tab);
    this.settingsChanged$.next({
      type: SettingsTypeEnum.FirstTab,
    });
  }

  public setAppearance(appearance: AppearanceType): void {
    this.electronService.appSettings.set(SettingsPaths.Appearance, appearance);
    this.settingsChanged$.next({
      type: SettingsTypeEnum.Scheme,
      value: appearance,
    });
  }

  public changeThemeColor(color: ColorEnum): void {
    this.electronService.appSettings.set(SettingsPaths.PrimaryColor, color);
    this.settingsChanged$.next({ type: SettingsTypeEnum.Color, value: color });
  }

  private migrateToNewSettings(): void {
    const settings = JSON.parse(
      this.electronService.fs.readFileSync(this.settingsPath, "utf8")
    ) as Settings;

    settings.appearance.appearance = 'light';
    this.electronService.setAppSettingsData(settings);
  }
}
