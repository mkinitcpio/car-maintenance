import { Injectable } from '@angular/core';

import { ElectronService } from '@core/services/electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private electronService: ElectronService) {}

  public show(title: string, body: string): void {
    const notification = new this.electronService.remote.Notification({ title, body });
    notification.show();
  }
}
