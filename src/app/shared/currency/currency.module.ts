import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '../pipes/currency.pipe';
import { NumberSeparatorPipe } from '../pipes/number-separator.pipe';
import { CmTextBody } from "@shared/components/typography/text-body/text-body";


@NgModule({
  declarations: [
    CurrencyComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CurrencyPipe,
    NumberSeparatorPipe,
    CmTextBody,
],
  exports: [
    CurrencyComponent,
  ]
})
export class CurrencyModule { }
