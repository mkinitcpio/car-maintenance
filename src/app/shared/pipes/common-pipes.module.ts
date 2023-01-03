import { CurrencyPipe } from './currency.pipe';
import { NgModule } from '@angular/core';
import { NumberSeparatorPipe } from './number-separator.pipe';
@NgModule({
  declarations: [
    CurrencyPipe,
    NumberSeparatorPipe,
  ],
  exports: [
    CurrencyPipe,
    NumberSeparatorPipe,
  ],
})
export class CommonPipesModule { }
