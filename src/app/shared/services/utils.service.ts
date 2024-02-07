import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

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
}
