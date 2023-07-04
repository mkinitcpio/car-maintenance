import { Injectable } from '@angular/core';
import { ColorEnum } from "@shared/components/settings/colors-enum";
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class LinuxThemeService extends ThemeService {

  private readonly primaryColor: string = "e95420";

  constructor() {
    super('linux', ['light', 'dark']);
  }

  public setAppColors(color: ColorEnum): void {
    super.setAppColors(color === ColorEnum.Default ? this.primaryColor : color);
  }
}
