import { Component, Inject } from "@angular/core";
import { DataBaseService } from "./core/database";
import { AutoCloseable } from "./core/auto-closeable";
import { SettingsService } from "./shared/components/settings/settings.service";
import { DOCUMENT } from "@angular/common";
import { ThemeService } from "@core/services/theme.service";
import { MatIconRegistry } from "@angular/material/icon";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent extends AutoCloseable {
  public dbExist: boolean;

  constructor(
    private dataBaseService: DataBaseService,
    private settingsService: SettingsService,
    private themeService: ThemeService,
    private matIconRegistry: MatIconRegistry,
    @Inject(DOCUMENT) private document: Document
  ) {
    super();

    this.matIconRegistry.setDefaultFontSetClass("material-symbols-rounded");

    this.settingsService.animationsStateChanged$.subscribe((enabled) => {
      if (enabled) {
        this.document.body.classList.remove("no-animations");
      } else {
        this.document.body.classList.add("no-animations");
      }
    });

    this.settingsService.init();
    this.themeService.init();

    this.dataBaseService.dbExist$.subscribe((exist) => {
      this.dbExist = exist;
    });

    this.dataBaseService.initDataBase();
  }
}
