import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';

import { PrintMarkupService } from './print-markup.service';
import { SettingsService } from '../components/settings/settings.service';
import { LocaleEnum } from '../components/settings/locale-enum';

describe('PrintMarkupService', () => {
  let service: PrintMarkupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: SettingsService,
          useValue: {
            units: () => ({}),
            region: () => LocaleEnum.Us,
            language: () => 'en',
          },
        },
        {
          provide: TranslateService,
          useValue: {
            instant: (key: string) => key,
          },
        },
      ],
    });

    service = TestBed.inject(PrintMarkupService);
  });

  it('builds the printable markup from the table data and visible columns', () => {
    let html = '';

    service.build(
      {
        multiply: false,
        tablesData: [{
          title: 'Engine',
          totalCost: 10,
          records: [{
            id: '1',
            name: 'Oil',
            cost: '10',
            mileage: 1000,
            date: new Date(2024, 0, 1),
            notes: 'Changed',
          } as any],
        }],
      },
      {
        showTablesCostResult: true,
        columns: [
          { id: 'name', name: 'RECORDS_TABLE.NAME', visible: true },
          { id: 'notes', name: 'RECORDS_TABLE.COMMENT', visible: false },
        ],
      },
    ).subscribe((result) => html = result);

    expect(html).toContain('<table class="preview-page__table">');
    expect(html).toContain('RECORDS_TABLE.NAME');
    expect(html).toContain('Oil');
    expect(html).not.toContain('Changed');
    expect(html).toContain('mat-column-name');
  });
});
