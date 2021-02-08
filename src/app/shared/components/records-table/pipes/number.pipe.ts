import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numberSeparator'})
export class NumberSeparatorPipe implements PipeTransform {
  transform(value: string, separator: string): string {
    return value.replace(/,/g, separator);
  }
}