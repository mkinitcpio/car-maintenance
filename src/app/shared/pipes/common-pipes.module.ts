import { CurrencyPipe } from './currency.pipe';
import { NgModule } from '@angular/core';
import { NumberSeparatorPipe } from './number-separator.pipe';
import { OrderTranslatePipe } from './order-translation.pipe';
@NgModule({
  declarations: [
    CurrencyPipe,
    NumberSeparatorPipe,
    OrderTranslatePipe,
  ],
  exports: [
    CurrencyPipe,
    NumberSeparatorPipe,
    OrderTranslatePipe,
  ],
})
export class CommonPipesModule { }
