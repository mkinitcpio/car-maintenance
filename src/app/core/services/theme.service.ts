import { Injectable } from "@angular/core";
import { ElectronService } from "./electron/electron.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public accentColor$: BehaviorSubject<string> = new BehaviorSubject(
    this.electronService.systemPreferences.getAccentColor()
  );

  constructor(private electronService: ElectronService) {
    this.electronService.systemPreferences.on(
      "accent-color-changed",
      (_, color) => {
        this.accentColor$.next(color);
      }
    );
  }

  public getSecondaryColor(color, c): string {
    const calc = (sub1, sub2) =>
      Math.min(255, Math.floor(parseInt(color.substr(sub1, sub2), 16) * c))
        .toString(16)
        .padStart(2, "0");
    return `#${calc(1, 2)}${calc(3, 2)}${calc(5, 2)}`;
  }

  public init(): void {
    this.accentColor$.subscribe((color) => {
      if (color) {
        document.documentElement.style.setProperty(
          "--primary-color",
          `#${color}`
        );
        document.documentElement.style.setProperty(
          "--secondary-color",
          this.getSecondaryColor(`#${color}`, 1.5)
        );
      } else {
        document.documentElement.style.setProperty(
          "--primary-color",
          "#e95420"
        );
        document.documentElement.style.setProperty(
          "--secondary-color",
          "#ff9069"
        );
      }
    });
  }
}
