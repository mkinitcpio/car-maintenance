import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '@shared/components/settings/settings.service';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private settingsService: SettingsService) {
  }

  transform(value: number, pattern = 'mediumDate'): any {
    const lang = this.settingsService.settings.language === 'ru' ? 'ru' : 'en_US';
    const datePipe: DatePipe = new DatePipe(lang);

    return datePipe.transform(value, pattern);
  }
}
