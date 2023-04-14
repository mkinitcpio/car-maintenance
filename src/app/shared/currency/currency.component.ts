import { Component, Input, OnInit } from '@angular/core';
import { CurrencyEnum } from '../components/settings/currency.enum';
import { LocaleEnum } from '../components/settings/locale-enum';
import { SettingsService } from '../components/settings/settings.service';
import { CurrencySizeEnum } from './currency-size.enum';
import { CurrencyRenderEnum } from './currency-render.enum';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ElectronService } from '@core/services';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  @Input()
  value: number;

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
  public currencyBase64SafeUrl: SafeUrl;

  constructor(
    public settingsService: SettingsService,
    public domSanitizer: DomSanitizer,
    public electronService: ElectronService,
    public httpClient: HttpClient,
  ) { }

  public ngOnInit(): void {
    if(this.renderAs === this.CurrencyRenderEnum.Image) {
      const currency = this.currency.toLowerCase();
      this.getBase64CurrencySafeUrl(currency).subscribe(safeUrl => this.currencyBase64SafeUrl = safeUrl);
    }
  }

  public getBase64CurrencySafeUrl(currency: string): Observable<SafeUrl> {
    return this.httpClient
      .get(`assets/icons/currencies/${currency}.svg`, {responseType: 'text'})
      .pipe(
        map(d => `data:image/svg+xml;base64,${btoa(d)}`),
        map(base64Data => this.domSanitizer.bypassSecurityTrustUrl(base64Data)),
      );
  }
}
