import { Injectable, OnDestroy } from "@angular/core";
import { ElectronService } from "./electron/electron.service";
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
  private readonly ubuntuPrimaryColor: string = "e95420";
  private darwinEventListenerId: number = null;

  constructor(
    private electronService: ElectronService,
    private settingsService: SettingsService,
  ) {}

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
      this.getSecondaryColor(`#${primary}`, 1, "1f")
    );
  }

  public init(): void {
    this.settingsService.settingsChanged$
      .pipe(filter((node) => node.type === SettingsTypeEnum.Color))
      .subscribe(({ value }) => {
        this.changeThemeColors(this.getPrimaryColor());
        if(this.isPredefinedColor(value as ColorEnum)) {
          this.unsubscribeFromSystemColorChanges();
        } else {
          this.listenSystemColorChanges();
        }
      });

    const primaryColor = this.getPrimaryColor();
    this.changeThemeColors(primaryColor);
    this.listenSystemColorChanges();
  }

  private getPrimaryColor(): string {
    let primaryColor = null;
    const settingsPrimaryColor = this.settingsService.settings.appearance.primaryColor;

    if(settingsPrimaryColor === ColorEnum.Default) {
      primaryColor = this.getSystemPrimaryColor(this.electronService.os.type());
    } else {
      primaryColor = settingsPrimaryColor;
    }

    return primaryColor;
  }

  private getSystemPrimaryColor(type: string): string {
    return type === SupportedPlatrofmsEnum.Linux
      ? this.ubuntuPrimaryColor
      : this.electronService.systemPreferences.getAccentColor();
  }

  private listenSystemColorChanges(): void {
    switch (this.electronService.os.type()) {
      case SupportedPlatrofmsEnum.Windows: {
        this.electronService.systemPreferences.on("accent-color-changed", (_, color) => this.settingsService.changeThemeColor(ColorEnum.Default));
        break;
      }
      case SupportedPlatrofmsEnum.Darwin: {
        this.darwinEventListenerId = this.electronService.systemPreferences.subscribeNotification("AppleColorPreferencesChangedNotification", () => this.settingsService.changeThemeColor(ColorEnum.Default));
        break;
      }
    }
  }

  private unsubscribeFromSystemColorChanges(): void {
    switch (this.electronService.os.type()) {
      case SupportedPlatrofmsEnum.Windows: {
        this.electronService.systemPreferences.removeAllListeners("accent-color-changed");
        break;
      }
      case SupportedPlatrofmsEnum.Darwin: {
        this.electronService.systemPreferences.unsubscribeNotification(this.darwinEventListenerId);
        break;
      }
    }


    // this.electronService.systemPreferences?.removeAllListeners("accent-color-changed");
    // this.electronService.systemPreferences?.unsubscribeNotification(this.darwinEventListenerId);
  }

  private isPredefinedColor(color: ColorEnum): boolean {
    return !ColorEnum[color];
  }

  ngOnDestroy(): void {
    this.unsubscribeFromSystemColorChanges();
  }
}
