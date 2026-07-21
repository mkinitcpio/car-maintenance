import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonPipesModule } from '../pipes/common-pipes.module';
import { CmTextBody } from "@shared/components/typography/text-body/text-body";


@NgModule({
  declarations: [
    CurrencyComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CommonPipesModule,
    CmTextBody,
],
  exports: [
    CurrencyComponent,
  ]
})
export class CurrencyModule { }
