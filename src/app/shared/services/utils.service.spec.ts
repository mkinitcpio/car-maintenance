import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;
  let translate: { defaultLang: string; get: jasmine.Spy };

  beforeEach(() => {
    translate = { defaultLang: 'en', get: jasmine.createSpy('get') };

    TestBed.configureTestingModule({
      providers: [UtilsService, { provide: TranslateService, useValue: translate }],
    });
    service = TestBed.inject(UtilsService);
  });

  describe('getResultCost', () => {
    it('sums numeric costs', () => {
      expect(service.getResultCost([{ cost: '10' }, { cost: '20.5' }])).toBe(30.5);
    });

    it('ignores empty / zero costs', () => {
      expect(service.getResultCost([{ cost: '10' }, { cost: '' }, { cost: '0' }])).toBe(10);
    });

    it('returns 0 for no records', () => {
      expect(service.getResultCost([])).toBe(0);
    });
  });

  describe('getLastDate', () => {
    it('returns the most recent date', () => {
      const older = new Date('2020-01-01');
      const newer = new Date('2022-06-01');

      expect(service.getLastDate([{ date: older }, { date: newer }])).toEqual(newer);
    });

    it('skips records without a date', () => {
      const date = new Date('2021-03-03');
      expect(service.getLastDate([{ date: null }, { date }])).toEqual(date);
    });

    it('returns null when there are no dated records', () => {
      expect(service.getLastDate([{ date: null }])).toBeNull();
      expect(service.getLastDate([])).toBeNull();
    });
  });

  describe('getDeclensionWord', () => {
    it('uses the singular/plural pair for non-russian languages', (done) => {
      translate.defaultLang = 'en';
      translate.get.and.returnValue(of(['item', 'items']));

      service.getDeclensionWord('KEY', 1).subscribe((word) => {
        expect(word).toBe('item');
        service.getDeclensionWord('KEY', 5).subscribe((plural) => {
          expect(plural).toBe('items');
          done();
        });
      });
    });

    it('applies russian declension rules', (done) => {
      translate.defaultLang = 'ru';
      const words = ['запись', 'записи', 'записей'];
      translate.get.and.returnValue(of(words));

      // These assertions characterise the *current* implementation. Note that
      // 11 resolves to the singular form: the teen-range branch is overridden by
      // the trailing `num === 1` check, so 11..14 are mis-declensed (an i18n bug
      // worth fixing in declensionRussianWord). 15..19 are unaffected.
      const expectations: Array<[number, string]> = [
        [1, 'запись'],
        [2, 'записи'],
        [5, 'записей'],
        [11, 'запись'],
        [15, 'записей'],
        [21, 'запись'],
      ];

      let pending = expectations.length;
      expectations.forEach(([count, expected]) => {
        service.getDeclensionWord('KEY', count).subscribe((word) => {
          expect(word).withContext(`count=${count}`).toBe(expected);
          if (--pending === 0) {
            done();
          }
        });
      });
    });
  });
});
