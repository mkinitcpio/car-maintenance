import { CurrencyPipe } from './currency.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    CurrencyPipe
  ],
  exports: [
    CurrencyPipe,
  ],
})
export class CommonPipesModule { }
