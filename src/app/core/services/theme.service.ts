import { Injectable } from "@angular/core";
import { ElectronService } from "./electron/electron.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private accentColor$: Subject<string> = new Subject();
  private readonly ubuntuPrimaryColor: string = "e95420";

  constructor(private electronService: ElectronService) {}

  private getSecondaryColor(color: string, percent: number): string {
    const calc = (sub1, sub2) =>
      Math.min(
        255,
        Math.floor(parseInt(color.substr(sub1, sub2), 16) * percent)
      )
        .toString(16)
        .padStart(2, "0");
    return `#${calc(1, 2)}${calc(3, 2)}${calc(5, 2)}`;
  }

  private changeThemeColors(primary: string): void {
    document.documentElement.style.setProperty(
      "--primary-color",
      `#${primary}`
    );

    document.documentElement.style.setProperty(
      "--secondary-color",
      this.getSecondaryColor(`#${primary}`, 1.5)
    );
  }

  public init(): void {
    this.accentColor$.subscribe((color) => {
      this.changeThemeColors(color);
    });

    if (this.electronService.os.type() === "Linux") {
      this.changeThemeColors(this.ubuntuPrimaryColor);
    } else {
      this.changeThemeColors(this.electronService.systemPreferences.getAccentColor());
      
      this.electronService.systemPreferences.on(
        "accent-color-changed",
        (_, color) => {
          this.accentColor$.next(color);
        }
      );
    }
  }
}
