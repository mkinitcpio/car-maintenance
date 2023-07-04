import { Injectable } from '@angular/core';
import { ColorEnum } from "@shared/components/settings/colors-enum";
import { ElectronService } from '../electron/electron.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class DarwinThemeService extends ThemeService {

  constructor(private electronService: ElectronService) {
    super('darwin');
  }

  public setAppColors(color: ColorEnum): void {
    if(color === ColorEnum.Default) {
      const color = this.electronService.systemPreferences.getAccentColor();
      super.setAppColors(color);
      this.eventListenerId = this.electronService.systemPreferences.subscribeNotification("AppleColorPreferencesChangedNotification", () => {
        const color = this.electronService.systemPreferences.getAccentColor();
        super.setAppColors(color);
      });
    } else {
      if(this.eventListenerId) {
        this.removeListener();
      }

      super.setAppColors(color);
    }
  }

  private removeListener(): void {
    this.electronService.systemPreferences.unsubscribeNotification(this.eventListenerId);
    this.eventListenerId = null;
  }
}
