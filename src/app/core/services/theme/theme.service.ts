import { AppearanceType } from "@shared/components/settings/interface";

import { schemas } from './schemas';

export type PlatformType = 'linux' | 'windows' | 'darwin';

export class ThemeService {

  private availableSchemas: Array<AppearanceType> = ['light', 'dark', 'auto'];
  private mediaQueryScheme = window.matchMedia('(prefers-color-scheme: dark)');

  protected eventListenerId: number | null;

  constructor(platform: PlatformType, availableSchemas?: Array<AppearanceType>) {
    this.setPlatform(platform);
    this.availableSchemas = availableSchemas ?? this.availableSchemas;
  }

  public setColorScheme(scheme: AppearanceType): void {
    if(scheme === 'auto') {
      this.setAutoScheme(this.mediaQueryScheme.matches);
      this.mediaQueryScheme.addEventListener('change', this.listenSchemeChanges);
    } else {
      this.mediaQueryScheme.removeEventListener('change', this.listenSchemeChanges);
      this.setSheme(scheme);
    }
  }

  public setAppColors(baseColor: string): void {
    baseColor = baseColor.replace(/#/, "");
    const primaryColor = this.getColor(`#${baseColor}`, 1);
    const secondaryColor = this.getColor(`#${baseColor}`, 1, "1f");

    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--secondary-color", secondaryColor);
  }

  public getAvailableSchemas() {
    return schemas.filter(schema => this.availableSchemas.includes(schema.type));
  }

  private getColor(color: string, percent: number, opacity = ""): string {
    const calc = (sub1, sub2) => Math.min(255, Math.floor(parseInt(color.substr(sub1, sub2), 16) * percent))
      .toString(16)
      .padStart(2, "0");

    return `#${calc(1, 2)}${calc(3, 2)}${calc(5, 2)}${opacity}`;
  }

  private listenSchemeChanges = (event: MediaQueryListEvent) => {
    this.setAutoScheme(event.matches);
  };

  private setPlatform(platform: PlatformType) {
    document.documentElement.setAttribute('data-platform', platform);
  }

  private setAutoScheme(isPrefersColorSchemeDark: boolean): void {
    const newColorScheme = isPrefersColorSchemeDark ? "dark" : "light";

    this.setSheme(newColorScheme);
  }

  private setSheme(sheme: AppearanceType): void {
    document.documentElement.setAttribute('data-theme', sheme);
  }
}