import { Component, Input } from '@angular/core';
import { CurrencyEnum } from '../components/settings/currency.enum';
import { LocaleEnum } from '../components/settings/locale-enum';
import { SettingsService } from '../components/settings/settings.service';
import { CurrencySizeEnum } from './currency-size.enum';
import { CurrencyRenderEnum } from './currency-render.enum';
import { CurrencyBase64Enum } from './currency-base64.enum';
import { DomSanitizer } from '@angular/platform-browser';

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
  renderAs: CurrencyRenderEnum = CurrencyRenderEnum.Svg;

  @Input()
  size: CurrencySizeEnum = CurrencySizeEnum.Medium;

  public LocaleEnum = LocaleEnum;
  public CurrencyEnum = CurrencyEnum;
  public CurrencySizeEnum = CurrencySizeEnum;
  public CurrencyRenderEnum = CurrencyRenderEnum;
  public CurrencyBase64Enum = CurrencyBase64Enum;
  
  constructor(
    public settingsService: SettingsService,
    public domSanitizer: DomSanitizer
  ) { }
}
