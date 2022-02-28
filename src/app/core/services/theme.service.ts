import { Injectable, OnDestroy } from "@angular/core";
import { ElectronService } from "./electron/electron.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Subject } from "rxjs";
import { SettingsService } from "@shared/components/settings/settings.service";
import { filter } from "rxjs/operators";
import { SettingsTypeEnum } from "@shared/components/settings/settings-type.enum";
import { ColorEnum } from "@shared/components/settings/colors-enum";

@Injectable({
  providedIn: "root",
})
export class ThemeService implements OnDestroy {
  private accentColor$: Subject<string> = new Subject();
  private readonly ubuntuPrimaryColor: string = "e95420";

  constructor(
    private electronService: ElectronService,
    private settingsService: SettingsService
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
      this.getSecondaryColor(`#${primary}`, 1, "30")
    );
  }

  public init(): void {
    this.settingsService.settingsChanged$
      .pipe(filter((node) => node.type === SettingsTypeEnum.Color))
      .subscribe(({ value }) => {
     
        this.changeThemeColors(value);
      });

    if (this.settingsService.settings.appearance.primaryColor === "Default") {
      this.accentColor$.subscribe((color) => {
        this.changeThemeColors(color);
      });
      if (this.electronService.os.type() === "Linux") {
        this.changeThemeColors(this.ubuntuPrimaryColor);
      } else {
        this.changeThemeColors(
          this.electronService.systemPreferences.getAccentColor()
        );

        this.electronService.systemPreferences.on(
          "accent-color-changed",
          (_, color) => {
            this.accentColor$.next(color);
          }
        );
      }
    } else {
      this.changeThemeColors(
        this.settingsService.settings.appearance.primaryColor
      );
    }
  }

  ngOnDestroy(): void {
    this.electronService.systemPreferences.removeAllListeners(
      "accent-color-changed"
    );
  }
}
