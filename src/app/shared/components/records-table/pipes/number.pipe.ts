import { Pipe, PipeTransform } from '@angular/core';

import { formatNumber } from '@angular/common';

import { LocaleEnum } from '../../settings/locale-enum';
import { SettingsService } from '../../settings/settings.service';

@Pipe({name: 'numberSeparator'})
export class NumberSeparatorPipe implements PipeTransform {

  constructor(private settingsService: SettingsService) { }

  transform(value: number): string {
    const locale = this.settingsService.settings.region;

    if(locale === LocaleEnum.Us) {
      return formatNumber(value, 'en');
    }

    if(locale === LocaleEnum.Ru || locale === LocaleEnum.By) {
      return formatNumber(value, 'en').replace(/,/g, ' ');
    }

    return null;
  }
}