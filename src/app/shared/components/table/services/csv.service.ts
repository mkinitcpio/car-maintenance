import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  public parse(header: HTMLElement, table: HTMLElement): string[][] {
    const headerCsvData = this.getHeaderColumnsText(header);
    const csvData: string[][] = [headerCsvData];

    table.querySelectorAll<HTMLElement>('.cm-table__row')
      .forEach((row, index) => {
        const cells = this.getCellElements(row);
        const rowData = cells.map((cell) => this.getValueFromDataCsvAttribute(cell));

        csvData.push([
          `${++index}`,
          ...rowData,
        ]);
      });

    return csvData;
  }

  private getHeaderColumnsText(header: HTMLElement): string[] {
    return ["#", ...Array.from(
      header.querySelectorAll<HTMLElement>('[data-csv]')
    ).map((cell) => this.getValueFromDataCsvAttribute(cell))
    ];
  }

  private getCellElements(row: HTMLElement): HTMLElement[] {
    return [...row.querySelectorAll<HTMLElement>('[data-csv]')];
  }

  private getValueFromDataCsvAttribute(cell: HTMLElement): string {
    return cell.dataset.csv || '';
  }
}
