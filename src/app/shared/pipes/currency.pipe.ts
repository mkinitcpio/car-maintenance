import { Pipe, PipeTransform } from '@angular/core';

import { CurrencyEnum } from '../components/settings/currency.enum';

import { currencies } from './currencies';

@Pipe({name: 'currency'})
export class CurrencyPipe implements PipeTransform {

  private currencies = currencies;

  private CurrencyEnum = CurrencyEnum;

  constructor(){}

  transform(currency: CurrencyEnum): string {
    return this.currencies[currency];
  }
}