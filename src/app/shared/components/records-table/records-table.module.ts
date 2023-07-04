import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecordsTableComponent} from './records-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumberSeparatorPipe } from './pipes/number.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyModule } from '../../currency/currency.module';
import { CommonPipesModule } from '@shared/pipes/common-pipes.module';

@NgModule({
  declarations: [
    RecordsTableComponent,
    NumberSeparatorPipe,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
    CurrencyModule,
    CommonPipesModule,
  ],
  exports: [
    RecordsTableComponent,
    NumberSeparatorPipe,
  ]
})
export class RecordsTableModule { }
