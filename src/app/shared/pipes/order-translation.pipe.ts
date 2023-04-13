import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'orderTranslate'
})
export class OrderTranslatePipe implements PipeTransform {

  constructor(private translate : TranslateService) {}

  transform<T>(array: Array<T>, key: string): Array<T> {
    return array.sort((first: T, second: T) => {
      const firstTranslatedValue = this.translate.instant(<string>first[key]);
      const secondTranslatedValue = this.translate.instant(<string>second[key]);

      if (firstTranslatedValue < secondTranslatedValue) {
        return -1;
      }

      else if (firstTranslatedValue > secondTranslatedValue) {
        return 1;
      }

      return 0;
    });
  }
}