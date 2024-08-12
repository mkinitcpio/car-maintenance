import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from '@shared/components/settings/language-enum';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private translateService = inject(TranslateService);

  public getResultCost<T extends { cost: string }>(records: T[]): number {
    const costs = records
      .map((record) => +record.cost)
      .filter(Boolean);

    return costs.reduce((acc, cost) => acc + cost , 0);
  }

  public getLastDate<T extends { date: Date }>(records: T[]): Date {
    const EMPTY = null;
    const allDates = records
      .filter((row) => row.date)
      .map((row) => (new Date(row.date)).getTime());
    const lastModifiedDate = allDates.length ? new Date(Math.max(...allDates)) : EMPTY;

    return lastModifiedDate;
  }

  public getDeclensionWord(declensionKey: string, count: number): Observable<string> {
    const currentLang = this.translateService.defaultLang;

    return this.translateService.get(declensionKey)
    .pipe(
      switchMap((declensions) => {
        let declension;

        if(currentLang === LanguageEnum.Ru) {
          declension = this.declensionRussianWord(count, declensions);
        } else {
          declension = count > 1 ? declensions[1] : declensions[0];
        }

        return of(declension);
      }),
    );
  }

  private declensionRussianWord(count: number, words: string[]): string {
    count = Math.abs(count) % 100;

    const num = count % 10;
    let declention = words[2];

    if(count > 10 && count < 20) {
      declention = words[2];
    }

    if(num > 1 && num < 5) {
      declention = words[1];
    }

    if(num == 1) {
      declention = words[0];
    }

    return declention;
  }
}
