import { Injectable } from '@angular/core';

import { ElectronService } from './electron/electron.service';

const ALLOWED_PROTOCOLS = new Set(['https:', 'mailto:']);

@Injectable({
  providedIn: 'root'
})
export class ExternalLinkService {

  constructor(private electronService: ElectronService) {}

  public isSafe(url: string | null | undefined): boolean {
    if (!url) {
      return false;
    }

    try {
      return ALLOWED_PROTOCOLS.has(new URL(url).protocol);
    } catch {
      return false;
    }
  }

  public open(url: string | null | undefined): boolean {
    if (!this.isSafe(url)) {
      console.warn(`ExternalLinkService: refused to open url "${url}"`);
      return false;
    }

    this.electronService.shell.openExternal(url);
    return true;
  }
}
