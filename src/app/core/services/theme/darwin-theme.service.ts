import { Injectable } from '@angular/core';
import { ColorEnum } from "@shared/components/settings/colors-enum";

import { AbstractThemeService } from './theme';

@Injectable({
  providedIn: 'root'
})
export class DarwinThemeService extends AbstractThemeService {

  constructor(private electronService: ElectronService) {
    super();
  }

  public setAppColors(color: ColorEnum): void {
    if(color === ColorEnum.Default) {
      this.eventListenerId = this.electronService.systemPreferences.subscribeNotification("AppleColorPreferencesChangedNotification", (color: string) => {
        super.setAppColors(color);
      });
    } else {
      super.setAppColors(color);
    }
  }

  private removeListener(): void {
    this.electronService.systemPreferences.unsubscribeNotification(this.eventListenerId);
    super.removeListener();
  }
}
