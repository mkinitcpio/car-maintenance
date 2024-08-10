import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';

import { LocaleEnum } from '@shared/components/settings/locale-enum';

@Pipe({name: 'numberSeparator'})
export class NumberSeparatorPipe implements PipeTransform {

  private digitsInfo = '1.2-2';

  constructor() { }

  transform(value: number, locale: LocaleEnum, ignoreАractionalPart = false): string {
    if(ignoreАractionalPart) {
      this.digitsInfo = null;
    }
    if(locale === LocaleEnum.Us) {
      return formatNumber(value, 'en', this.digitsInfo);
    }

    if(locale === LocaleEnum.Ru || locale === LocaleEnum.By || locale === LocaleEnum.Kz) {
      return formatNumber(value, 'ru');
    }

    return null;
  }
}
