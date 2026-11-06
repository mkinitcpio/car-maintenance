import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Observable, catchError, map, of } from 'rxjs';

import { NumberSeparatorPipe } from '../pipes/number-separator.pipe';
import { currencies } from '../pipes/currencies';
import { CurrencyEnum } from '../components/settings/currency.enum';
import { LocaleEnum } from '../components/settings/locale-enum';
import { SettingsService } from '../components/settings/settings.service';
import { appImageBase64 } from '../components/print-dialog/preview-page/app-image.base64';
import { PrintDialogConfig } from '../components/print-dialog/print-dialog-config';
import { ColumnConfig, PreviewPageConfig } from '../components/print-dialog/preview-page/preview-page-config';

type TableData = PrintDialogConfig['tablesData'][number];
type TableRecord = TableData['records'][number];

@Injectable({
  providedIn: 'root',
})
export class PrintMarkupService {

  private readonly http = inject(HttpClient);
  private readonly settings = inject(SettingsService);
  private readonly translate = inject(TranslateService);

  private readonly numberPipe = new NumberSeparatorPipe();
  private readonly iconCache = new Map<CurrencyEnum, string>();

  public build(data: PrintDialogConfig, config: PreviewPageConfig): Observable<string> {
    if (!data || !config) {
      return of('');
    }

    const currency = this.settings.units()?.currency;

    if (!currency) {
      return of(this.render(data, config, null));
    }

    return this.getCurrencyIcon(currency).pipe(
      map((icon) => this.render(data, config, icon)),
      catchError(() => of(this.render(data, config, null))),
    );
  }

  private getCurrencyIcon(currency: CurrencyEnum): Observable<string> {
    const cached = this.iconCache.get(currency);

    if (cached) {
      return of(cached);
    }

    return this.http
      .get(`assets/icons/currencies/${currencies[currency]}.svg`, { responseType: 'text' })
      .pipe(
        map((svg) => {
          const icon = `data:image/svg+xml;base64,${btoa(svg)}`;
          this.iconCache.set(currency, icon);
          return icon;
        }),
      );
  }

  private render(
    data: PrintDialogConfig,
    config: PreviewPageConfig,
    currencyIcon: string | null,
  ): string {
    const locale = this.settings.region();
    const language = this.settings.language();
    const columns = (config.columns ?? []).filter((column) => column.visible);
    const totalCost = (data.tablesData ?? [])
      .flatMap((table) => table.records ?? [])
      .map((record) => +record.cost)
      .filter(Boolean)
      .reduce((acc, cost) => acc + cost, 0);

    const titleSection = data.multiply ? `
      <div class="preview-page__title-container">
        <h2 class="preview-page__category-title">${this.escape(data.title)}</h2>
        <div class="preview-page__cost-section">
          <div class="preview-page__cost-section-text">
            <span>${this.escape(this.translate.instant('PAGES.PDF_EXPORT.TOTAL'))}: </span>
            ${this.renderCurrency(totalCost, locale, currencyIcon)}
          </div>
        </div>
      </div>` : '';

    const sections = (data.tablesData ?? [])
      .map((category) => `
        <section class="preview-page__category-section">
          <div class="preview-page__title-container">
            <h3 class="preview-page__title">${this.escape(category.title)}</h3>
            ${config.showTablesCostResult ? `
              <div class="preview-page__cost-section">
                <div class="preview-page__cost-section-text">
                  <span>${this.escape(this.translate.instant('PAGES.DETAIL.OVERALL_EXPENSE'))}: </span>
                  ${this.renderCurrency(category.totalCost, locale, currencyIcon)}
                </div>
              </div>` : ''}
          </div>
          ${this.renderTable(category, columns, locale, language)}
        </section>`)
      .join('');

    return `<div class="preview-page__printable">
      <div class="preview-page__app-title-container">
        <img class="preview-page__app-icon" src="${appImageBase64}" alt="">
        <h1 class="preview-page__app-title">Car Maintenance</h1>
      </div>
      <hr class="preview-page__divider">
      ${titleSection}
      ${sections}
    </div>`;
  }

  private renderTable(
    table: TableData,
    columns: ReadonlyArray<ColumnConfig>,
    locale: LocaleEnum,
    language: string,
  ): string {
    const header = columns
      .map((column) => `<th class="mat-column-${this.escape(column.id)}">${this.escape(this.translate.instant(column.name))}</th>`)
      .join('');

    const body = (table.records ?? [])
      .map((record) => `<tr>${columns
        .map((column) => `<td class="mat-column-${this.escape(column.id)}">${this.renderCell(record, column, locale, language)}</td>`)
        .join('')}</tr>`)
      .join('');

    return `<table class="preview-page__table"><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`;
  }

  private renderCell(record: TableRecord, column: ColumnConfig, locale: LocaleEnum, language: string): string {
    switch (column.id) {
      case 'date':
        return `<span class="preview-page__nowrap">${this.formatDate(record.date, language)}</span>`;
      case 'cost':
      case 'mileage':
        return `<span class="preview-page__nowrap">${this.formatNumber(+record[column.id], locale)}</span>`;
      default:
        return this.escape(record[column.id]);
    }
  }

  private renderCurrency(value: number, locale: LocaleEnum, icon: string | null): string {
    const image = icon ? `<img class="currency__image" src="${icon}" alt="">` : '';

    return `<div class="currency"><span class="currency__value">${this.formatNumber(value, locale)}</span>${image}</div>`;
  }

  private formatNumber(value: number, locale: LocaleEnum): string {
    return this.numberPipe.transform(+value, locale) ?? '';
  }

  private formatDate(value: Date, language: string): string {
    const locale = language === 'en' ? 'en_US' : 'ru';

    return new DatePipe(locale).transform(value, 'mediumDate') ?? '';
  }

  private escape(value: unknown): string {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
