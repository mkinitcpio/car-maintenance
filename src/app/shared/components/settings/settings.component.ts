import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { first } from "rxjs/operators";
import { DataBaseService } from "../../../core/database";
import { ElectronService } from "../../../core/services";
import { IconTypeEnum } from "./icon-type.enum";
import { ColorEnum } from "./colors-enum";
import { Color } from "./color-interface";
import { languageOptions } from "./language-options";
import { LocaleEnum } from "./locale-enum";
import { MetricSystemEnum } from "./metric-system.enum";
import { CurrencyEnum } from "./currency.enum";
import { NavigationTabEnum } from "./navigation-tab.enum";
import { regionOptions } from "./region-options";
import { currencyOptions } from "./currency-options";

import { SettingsService } from "./settings.service";
import { ThemeService } from "@core/services/theme.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {
  public languageOptions = languageOptions;
  public regionOptions = regionOptions;
  public currencyOptions = currencyOptions;

  public MetricSystemEnum = MetricSystemEnum;
  public IconTypeEnum = IconTypeEnum;
  public CurrencyEnum = CurrencyEnum;
  public NavigationTabEnum = NavigationTabEnum;
  public ColorEnum = ColorEnum;
  public colors: Color[];
  public selected: string;

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    public settingsService: SettingsService,
    private electronService: ElectronService,
    private dataBaseService: DataBaseService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.colors = this.getColors();

    if (this.selected === undefined) {
      this.selected = this.settingsService.settings.appearance.primaryColor;
    }

   
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
    this.settingsService.setIconType(
      event.checked ? IconTypeEnum.Mono : IconTypeEnum.Color
    );
    this.settingsService.saveSettings();
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
            this.settingsService.saveSettings();
          });

          this.settingsService.setDataBasePath(filePath);
          this.dataBaseService.initDataBase();
          this.settingsService.saveSettings();
        }
      });
  }

  public onMetricSystemChanged(mSystem: MetricSystemEnum): void {
    this.settingsService.setMetricSystem(mSystem);
    this.settingsService.saveSettings();
  }

  public onSelectCurrency(currency: CurrencyEnum): void {
    this.settingsService.setCurrency(currency);
    this.settingsService.saveSettings();
  }

  public onAnimationsChanged(event: MatSlideToggleChange): void {
    this.settingsService.setAnimations(event.checked);
    this.settingsService.saveSettings();
  }

  onFirstTabChanged(tab: NavigationTabEnum): void {
    this.settingsService.setFirstTab(tab);
    this.settingsService.saveSettings();
  }

  getColors(): Color[] {
    let colors = [];
    for (let element in ColorEnum) {
      if (ColorEnum[element] !== "Default") {
        colors.push({ name: element, color: ColorEnum[element] });
      }
    }
    return colors;
  }

  public onSelected(colors: ColorEnum) {
    this.settingsService.changeThemeColor(colors);
    this.settingsService.saveSettings();
  }

  public onSetDefault() {
    this.settingsService.setDefaultThemeColor();
    this.themeService.init();
    this.settingsService.saveSettings();
   
  }
}
