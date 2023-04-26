import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ElectronService } from "../../../core/services";
import { CurrencyEnum } from "./currency.enum";
import { IconTypeEnum } from "./icon-type.enum";
import { AppearanceType, Settings } from "./interface";

import { LanguageEnum } from "./language-enum";
import { LocaleEnum } from "./locale-enum";
import { MetricSystemEnum } from "./metric-system.enum";
import { NavigationTabEnum } from "./navigation-tab.enum";
import { SettingsTypeEnum } from "./settings-type.enum";
import { ColorEnum } from "./colors-enum";
import { NavigationEnum } from "app/home/navigation-bar/navigation.enum";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  public settings: Settings;

  private readonly appConfFolder: string =
    this.electronService.os.homedir() + "/.config/Учет";
  private readonly settingsPath: string =
    this.electronService.os.homedir() + "/.config/Учет/settings.json";
  private readonly oldConfigPath: string =
    this.electronService.os.homedir() + "/.config/Учет/conf";
  private readonly defaultSettings: Settings = null;

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
    this.defaultSettings = {
      language: this.translate.getBrowserLang(),
      databasePath: null,
      startPage: NavigationEnum.Dashboard,
      region: this.translate.getBrowserLang() as LocaleEnum,
      appearance: {
        appearance: 'light',
        iconPack: "default",
        type: IconTypeEnum.Color,
        animations: true,
        primaryColor: ColorEnum.Default,
      },
      units: {
        metricSystem: null,
        currency: null,
      },
      firstTab: NavigationTabEnum.Categories,
    };
  }

  public init(): void {
    const confExist = this.electronService.fs.existsSync(this.appConfFolder);
    const settingsExist = this.electronService.fs.existsSync(this.settingsPath);
    const oldConfigExist = this.electronService.fs.existsSync(
      this.oldConfigPath
    );

    // Need for migration 1.3.1 => 2.0.0
    if (oldConfigExist) {
      const databasePath = this.electronService.fs.readFileSync(
        this.oldConfigPath,
        "utf8"
      );

      this.defaultSettings.databasePath = databasePath;
      this.electronService.fs.unlinkSync(this.oldConfigPath);
    }

    if (!confExist) {
      this.electronService.fs.mkdirSync(this.appConfFolder, {
        recursive: true,
      });
    }

    if (settingsExist) {
      this.settings = JSON.parse(
        this.electronService.fs.readFileSync(this.settingsPath, "utf8")
      );
      if (!this.settings.appearance) {
        this.settings.appearance = this.defaultSettings.appearance;
      }

      if (!this.settings.firstTab === undefined) {
        this.settings.firstTab = this.defaultSettings.firstTab;
      }

      if (!this.settings.startPage) {
        this.settings.startPage = this.defaultSettings.startPage;
      }

      if (this.settings.appearance.primaryColor === undefined) {
        this.settings.appearance.primaryColor = ColorEnum.Default;
      }

      if (this.settings.appearance.animations === undefined) {
        this.settings.appearance.animations = true;
      }

      if (!this.settings.appearance.appearance) {
        this.settings.appearance.appearance = this.defaultSettings.appearance.appearance;
      }

    } else {
      const translateExist = this.translate
        .getLangs()
        .includes(this.defaultSettings.language);

      if (!translateExist) {
        this.defaultSettings.language = LanguageEnum.En;
        this.defaultSettings.region = LocaleEnum.Us;
      } else {
        if (this.defaultSettings.language === LanguageEnum.En) {
          this.defaultSettings.region = LocaleEnum.Us;
        }
      }

      this.settings = this.defaultSettings;
      this.saveSettings();
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
    this.translate.setDefaultLang(lang);
  }

  public setAnimations(state: boolean): void {
    this.settings.appearance.animations = state;
    this.animationsStateChanged$.next(state);
  }

  public setRegion(region: LocaleEnum): void {
    this.settings.region = region;
  }

  public setDataBasePath(path: string): void {
    this.settings.databasePath = path;
    this.settingsChanged$.next({
      type: SettingsTypeEnum.Database,
    });
  }

  public setStartPage(navigationRoute: NavigationEnum): void {
    this.settings.startPage = navigationRoute;
  }

  public setMetricSystem(metricSystem: MetricSystemEnum): void {
    if (this.settings.units) {
      this.settings.units.metricSystem = metricSystem;
    } else {
      this.settings.units = {
        metricSystem,
        currency: null,
      };
    }

    this.settingsChanged$.next({
      type: SettingsTypeEnum.Database,
    });
  }

  public setCurrency(currency: CurrencyEnum): void {
    if (this.settings.units) {
      this.settings.units.currency = currency;
    } else {
      this.settings.units = {
        currency,
        metricSystem: null,
      };
    }

    this.settingsChanged$.next({
      type: SettingsTypeEnum.Database,
    });
  }

  public setFirstTab(tab: NavigationTabEnum): void {
    this.settings.firstTab = tab;
    this.settingsChanged$.next({
      type: SettingsTypeEnum.FirstTab,
    });
  }

  public setAppearance(appearance: AppearanceType): void {
    this.settings.appearance.appearance = appearance;
    this.settingsChanged$.next({
      type: SettingsTypeEnum.Scheme,
      value: appearance,
    });
  }

  public saveSettings(): void {
    this.electronService.fs.writeFileSync(
      this.settingsPath,
      JSON.stringify(this.settings),
      { encoding: "utf8" }
    );
  }

  public changeThemeColor(color: ColorEnum): void {
    this.settings.appearance.primaryColor = color;
    this.settingsChanged$.next({ type: SettingsTypeEnum.Color, value: color });
  }
}
