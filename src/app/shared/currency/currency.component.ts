import { Component, Input } from '@angular/core';
import { CurrencyEnum } from '../components/settings/currency.enum';
import { LocaleEnum } from '../components/settings/locale-enum';
import { CurrencySizeEnum } from './currency-size.enum';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {

  @Input()
  currency: CurrencyEnum;
  @Input()
  locale: LocaleEnum;
  @Input()
  size: CurrencySizeEnum = CurrencySizeEnum.Medium;

  public LocaleEnum = LocaleEnum;
  public CurrencyEnum = CurrencyEnum;
  public CurrencySizeEnum = CurrencySizeEnum;
  
  constructor() { }
}
