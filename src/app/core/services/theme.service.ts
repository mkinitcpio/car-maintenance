import { Injectable, OnDestroy } from "@angular/core";
import { ElectronService } from "./electron/electron.service";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

import { SettingsService } from "@shared/components/settings/settings.service";
import { SettingsTypeEnum } from "@shared/components/settings/settings-type.enum";
import { ColorEnum } from "@shared/components/settings/colors-enum";

enum SupportedPlatrofmsEnum {
  Windows = "Windows_NT",
  Linux = "Linux",
  Darwin = "Darwin",
}

@Injectable({
  providedIn: "root",
})
export class ThemeService implements OnDestroy {
  private accentColor$: Subject<string> = new Subject();
  private readonly ubuntuPrimaryColor: string = "e95420";
  private darwinEventListenerId: number = null;

  constructor(private electronService: ElectronService) {}

  private getSecondaryColor(
    color: string,
    percent: number,
    opacity = ""
  ): string {
    const calc = (sub1, sub2) =>
      Math.min(
        255,
        Math.floor(parseInt(color.substr(sub1, sub2), 16) * percent)
      )
        .toString(16)
        .padStart(2, "0");
    return `#${calc(1, 2)}${calc(3, 2)}${calc(5, 2)}${opacity}`;
  }

  private changeThemeColors(primary: string): void {
    primary = primary.replace(/#/, "");

    document.documentElement.style.setProperty(
      "--primary-color",
      this.getSecondaryColor(`#${primary}`, 1)
    );

    document.documentElement.style.setProperty(
      "--secondary-color",
      this.getSecondaryColor(`#${primary}`, 1, "30")
    );
  }

  public init(): void {
    this.settingsService.settingsChanged$
      .pipe(filter((node) => node.type === SettingsTypeEnum.Color))
      .subscribe(({ value }) => {
     
        this.changeThemeColors(value);
      });

    const primaryColor = this.electronService.os.type() === SupportedPlatrofmsEnum.Linux
      ? this.ubuntuPrimaryColor
      : this.electronService.systemPreferences.getAccentColor();

    this.changeThemeColors(primaryColor);

    switch (this.electronService.os.type()) {
      case SupportedPlatrofmsEnum.Windows: {
        this.electronService.systemPreferences.on("accent-color-changed", (_, color) => this.accentColor$.next(color));
        break;
      }
      case SupportedPlatrofmsEnum.Darwin: {
        this.darwinEventListenerId = this.electronService.systemPreferences.subscribeNotification("AppleColorPreferencesChangedNotification", () => this.accentColor$.next(
          this.electronService.systemPreferences.getAccentColor()
        ));
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.electronService.systemPreferences.removeAllListeners("accent-color-changed");
    this.electronService.systemPreferences.unsubscribeNotification(this.darwinEventListenerId);
  }
}
