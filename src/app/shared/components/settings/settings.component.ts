import { Component, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { DataBaseService } from "../../../core/database";
import { ElectronService } from "../../../core/services";
import { ColorEnum } from "./colors-enum";
import { languageOptions } from "./language-options";
import { LocaleEnum } from "./locale-enum";
import { MetricSystemEnum } from "./metric-system.enum";
import { CurrencyEnum } from "./currency.enum";
import { NavigationTabEnum } from "./navigation-tab.enum";
import { regionOptions } from "./region-options";
import { currencyOptions } from "./currency-options";
import { startPageOptions } from "./start-page-options";

import { SettingsService } from "./settings.service";

import { colors } from './colors';

import { AppConfig } from 'environments/environment';
import { NavigationEnum } from "app/home/navigation-bar/navigation.enum";
import { AppearanceType } from "./interface";
import { ThemeService } from "@core/services/theme";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent {
  public languageOptions = languageOptions;
  public regionOptions = regionOptions;
  public currencyOptions = currencyOptions;
  public startPageOptions = startPageOptions;

  public MetricSystemEnum = MetricSystemEnum;
  public CurrencyEnum = CurrencyEnum;
  public NavigationTabEnum = NavigationTabEnum;
  public ColorEnum = ColorEnum;
  public colors = colors;
  public selected: string;
  public readonly AppConfig = AppConfig;

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    public settingsService: SettingsService,
    private electronService: ElectronService,
    private dataBaseService: DataBaseService,
    public themeService: ThemeService,
  ) {}

  public onSelectLanguage(language: string): void {
    this.settingsService.setAppLanguage(language);
  }

  public onSelectRegion(region: LocaleEnum): void {
    this.settingsService.setRegion(region);
  }

  public onDatabaseChange(): void {
    const oldDatabasePath = this.settingsService.settings.databasePath;

    this.electronService.dialog
      .showOpenDialog({ properties: ["openFile"] })
      .then((data) => {
        if (data.filePaths.length) {
          const filePath = data.filePaths[0];

          this.dataBaseService.databaseError$.pipe(first()).subscribe(() => {
            this.settingsService.setDataBasePath(oldDatabasePath);
          });

          this.settingsService.setDataBasePath(filePath);
          this.dataBaseService.initDataBase();
        }
      });
  }

  public onMetricSystemChanged(mSystem: MetricSystemEnum): void {
    this.settingsService.setMetricSystem(mSystem);
  }

  public onSelectCurrency(currency: CurrencyEnum): void {
    this.settingsService.setCurrency(currency);
  }

  public onAnimationsChanged(checked: boolean): void {
    this.settingsService.setAnimations(checked);
  }

  public onStartPageChanged(navigationRoute: NavigationEnum): void {
    this.settingsService.setStartPage(navigationRoute);
  }

  onFirstTabChanged(tab: NavigationTabEnum): void {
    this.settingsService.setFirstTab(tab);
  }

  public onSelectColor(colors: ColorEnum) {
    this.settingsService.changeThemeColor(colors);
  }

  public setAppearance(appearance: AppearanceType): void {
    this.settingsService.setAppearance(appearance);
  }

  public getCurrentCurrency() {
    return this.currencyOptions.find((currencyOption) => currencyOption.value === this.settingsService.settings.units.currency);
  }
}
