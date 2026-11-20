import { inject, Service } from '@angular/core';
import { DataBaseService } from '@core/database';
import { Record } from '../detail/state/interface';

@Service()
export class StatsService {

  private database = inject(DataBaseService);

  public async getCostByMonthData(): Promise<any> {
    const records = await this.database.getAllRecords();

    const data = records.reduce((acc, record) => {
      const year = (new Date(record.date)).getFullYear();
      if (acc[year]) {
        acc[year].push(record);
      } else {
        acc[year] = [record];
      }

      return acc;
    }, {});

    return data;
  }

}
