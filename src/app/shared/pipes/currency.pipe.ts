import { Pipe, PipeTransform } from '@angular/core';

import { CurrencyEnum } from '../components/settings/currency.enum';
import { LocaleEnum } from '../components/settings/locale-enum';

import { currencies } from './currencies';

@Pipe({name: 'currency'})
export class CurrencyPipe implements PipeTransform {

  private currencies = currencies;

  private CurrencyEnum = CurrencyEnum;

  constructor(){}

  transform(currency: CurrencyEnum, region: LocaleEnum): string {
    return currency ? this.currencies[currency] : this.currencies[this.CurrencyEnum[region]];
  }
}