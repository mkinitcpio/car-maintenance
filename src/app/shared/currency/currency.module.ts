import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonPipesModule } from '../pipes/common-pipes.module';


@NgModule({
  declarations: [
    CurrencyComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CommonPipesModule,
  ],
  exports: [
    CurrencyComponent,
  ]
})
export class CurrencyModule { }
