import { Component, Inject } from "@angular/core";
import { DataBaseService } from "./core/database";
import { AutoCloseable } from "./core/auto-closeable";
import { SettingsService } from "./shared/components/settings/settings.service";
import { DOCUMENT } from "@angular/common";
import { ThemeService } from "@core/services/theme.service";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { iconsNames } from "./icon-names";
import { groupIllustrationNames } from './group-illustration-names';
import { currencyNames } from './currencies-names';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent extends AutoCloseable {

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

    this.settingsService.init();
    this.themeService.init();

    this.dataBaseService.initDataBase();
  }
}
