import { Injectable } from '@angular/core';

import { VersionRepository } from '@core/repositories/version.repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as packageJson from '../../../../package.json';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  public appVersion = packageJson.version;
  public hasUpdate = false;

  constructor(private versionRepository: VersionRepository) {
    this.hasUpdate$.subscribe(hasUpdate => {
      this.hasUpdate = hasUpdate;
    });
  }

  private get hasUpdate$(): Observable<boolean> {
    return this.versionRepository.getLatestVersion()
      .pipe(map(version => this.appVersion < version));
  }
}
