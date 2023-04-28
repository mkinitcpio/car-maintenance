import { CurrencyPipe } from './currency.pipe';
import { NgModule } from '@angular/core';
import { NumberSeparatorPipe } from './number-separator.pipe';
import { OrderTranslatePipe } from './order-translation.pipe';
import { LocalizedDatePipe } from './localized-date.pipe';

@NgModule({
  declarations: [
    CurrencyPipe,
    NumberSeparatorPipe,
    OrderTranslatePipe,
    LocalizedDatePipe,
  ],
  exports: [
    CurrencyPipe,
    NumberSeparatorPipe,
    OrderTranslatePipe,
    LocalizedDatePipe,
  ],
})
export class CommonPipesModule { }
