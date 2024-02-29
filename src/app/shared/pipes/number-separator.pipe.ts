import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';

import { LocaleEnum } from '@shared/components/settings/locale-enum';

@Pipe({name: 'numberSeparator'})
export class NumberSeparatorPipe implements PipeTransform {

  constructor() { }

  transform(value: number, locale: LocaleEnum): string {
    if(locale === LocaleEnum.Us) {
      return formatNumber(value, 'en', '1.2-2');
    }

    if(locale === LocaleEnum.Ru || locale === LocaleEnum.By) {
      return formatNumber(value, 'en', '1.2-2').replace(/,/g, ' ');
    }

    return null;
  }
}