import { CsvService } from './csv.service';

describe('CsvService', () => {
  let service: CsvService;

  beforeEach(() => {
    service = new CsvService();
  });

  function buildHeader(labels: string[]): HTMLElement {
    const header = document.createElement('div');
    labels.forEach((label) => {
      const cell = document.createElement('div');
      cell.dataset.csv = label;
      header.appendChild(cell);
    });
    return header;
  }

  function buildTable(rows: string[][]): HTMLElement {
    const table = document.createElement('div');
    rows.forEach((cells) => {
      const row = document.createElement('div');
      row.className = 'cm-table__row';
      cells.forEach((value) => {
        const cell = document.createElement('div');
        cell.dataset.csv = value;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });
    return table;
  }

  it('prefixes the header row with a "#" index column', () => {
    const result = service.parse(buildHeader(['Name', 'Cost']), buildTable([]));

    expect(result[0]).toEqual(['#', 'Name', 'Cost']);
  });

  it('emits a 1-based row index followed by each cell value', () => {
    const result = service.parse(
      buildHeader(['Name', 'Cost']),
      buildTable([
        ['Oil', '50'],
        ['Filter', '20'],
      ]),
    );

    expect(result).toEqual([
      ['#', 'Name', 'Cost'],
      ['1', 'Oil', '50'],
      ['2', 'Filter', '20'],
    ]);
  });

  it('reads empty strings for cells without a data-csv value', () => {
    const table = document.createElement('div');
    const row = document.createElement('div');
    row.className = 'cm-table__row';
    const cell = document.createElement('div');
    cell.dataset.csv = '';
    row.appendChild(cell);
    table.appendChild(row);

    const result = service.parse(buildHeader(['Name']), table);

    expect(result[1]).toEqual(['1', '']);
  });

  it('returns only the header when there are no rows', () => {
    const result = service.parse(buildHeader(['Name']), buildTable([]));

    expect(result).toEqual([['#', 'Name']]);
  });
});
