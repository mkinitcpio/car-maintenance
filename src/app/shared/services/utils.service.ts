import { Injectable } from '@angular/core';
import { Record } from '../../detail/state/interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public getResultCost(records: Record[]): number {
    const costs = records
      .map((record) => +record.cost)
      .filter(Boolean);

    return costs.reduce((acc, cost) => acc + cost , 0);
  }
}
