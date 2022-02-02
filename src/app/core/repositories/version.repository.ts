import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AppConfig } from '../../../environments/environment';

interface LatestVerstionData {
  latest: string;
}

@Injectable({
  providedIn: 'root'
})
export class VersionRepository {

  constructor(private http: HttpClient) {}

  public getLatestVersion(): Observable<string> {
    return this.http.get<LatestVerstionData>(`${AppConfig.api.url}/version/latest`)
      .pipe(map(data => data.latest),
            catchError(() => {
              return of(null);
            }));
  }
}
