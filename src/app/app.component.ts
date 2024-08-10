import { Component, inject, Inject } from "@angular/core";
import { DataBaseService } from "./core/database";
import { AutoCloseable } from "./core/auto-closeable";
import { SettingsService } from "./shared/components/settings/settings.service";
import { DOCUMENT } from "@angular/common";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { iconsNames } from "./icon-names";
import { groupIllustrationNames } from './group-illustration-names';
import { currencyNames } from './currencies-names';
import { filter } from "rxjs/operators";
import { SettingsTypeEnum } from "@shared/components/settings/settings-type.enum";
import { LanguageEnum } from "@shared/components/settings/language-enum";
import { ThemeService } from "@core/services/theme";
import { AppearanceType } from "@shared/components/settings/interface";
import { DateAdapter } from "@angular/material/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent extends AutoCloseable {

  private readonly dateAdapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);

  constructor(
    private dataBaseService: DataBaseService,
    private settingsService: SettingsService,
    private themeService: ThemeService,
    private matIconRegistry: MatIconRegistry,
    private domS: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) {
    super();

    iconsNames.forEach(name => {
      this.matIconRegistry.addSvgIcon(`${name}`, this.domS.bypassSecurityTrustResourceUrl(`assets/icons/vuesax/${name}.svg`));
    });

    groupIllustrationNames.forEach(name => {
      this.matIconRegistry.addSvgIconInNamespace('illustrations', name, this.domS.bypassSecurityTrustResourceUrl(`assets/group-icons/${name}.svg`));
    });

    currencyNames.forEach(name => {
      this.matIconRegistry.addSvgIconInNamespace('currencies', name, this.domS.bypassSecurityTrustResourceUrl(`assets/icons/currencies/${name}.svg`));
    });

    this.matIconRegistry.setDefaultFontSetClass('material-symbols-rounded');

    this.settingsService.animationsStateChanged$.subscribe((enabled) => {
      if (enabled) {
        this.document.body.classList.remove("no-animations");
      } else {
        this.document.body.classList.add("no-animations");
      }
    });

    this.settingsService.settingsChanged$
      .pipe(filter((node) => node.type === SettingsTypeEnum.Color))
      .subscribe(({ value }) => {
        this.themeService.setAppColors(value as string);
      });

    this.settingsService.settingsChanged$
      .pipe(filter((node) => node.type === SettingsTypeEnum.Scheme))
      .subscribe(({ value }) => {
        this.themeService.setColorScheme(value as AppearanceType);
      });

    this.settingsService.settingsChanged$
      .pipe(filter((node) => node.type === SettingsTypeEnum.Language))
      .subscribe(({ value }) => {
        const lang = value === LanguageEnum.En ? LanguageEnum.En : LanguageEnum.Ru;
        this.dateAdapter.setLocale(lang);
      });

    this.settingsService.init();
    this.dataBaseService.initDataBase();
  }
}
