import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';

import { LocaleEnum } from '@shared/components/settings/locale-enum';

@Pipe({
    name: 'numberSeparator',
    standalone: true
})
export class NumberSeparatorPipe implements PipeTransform {

  constructor() { }

  transform(value: number, locale: LocaleEnum, ignoreFractionalPart = false): string {
    // Computed per call: pure pipes share one instance per template, so any
    // instance-level state would leak between bindings in the same template.
    const digitsInfo = ignoreFractionalPart ? null : '1.2-2';

    if(locale === LocaleEnum.Us) {
      return formatNumber(value, 'en', digitsInfo);
    }

    if(locale === LocaleEnum.Ru || locale === LocaleEnum.By || locale === LocaleEnum.Kz) {
      return formatNumber(value, 'ru');
    }

    return null;
  }
}
