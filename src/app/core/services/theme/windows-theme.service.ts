import { Injectable } from '@angular/core';
import { ColorEnum } from "@shared/components/settings/colors-enum";
import { ElectronService } from '../electron/electron.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class WindowsThemeService extends ThemeService {

  constructor(private electronService: ElectronService) {
    super();
  }

  public setAppColors(color: ColorEnum): void {
    if(color === ColorEnum.Default) {
      this.electronService.systemPreferences.on("accent-color-changed", (_, color) => {
        super.setAppColors(color);
      });
    } else {
      this.removeListener();
      super.setAppColors(color);
    }
  }

  private removeListener(): void {
    this.electronService.systemPreferences.removeAllListeners("accent-color-changed");
  }
}
