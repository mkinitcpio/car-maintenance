import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecordsTableComponent} from './records-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumberSeparatorPipe } from './pipes/number.pipe';
import { TranslateModule } from '@ngx-translate/core';

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
  ],
  exports: [
    RecordsTableComponent,
  ]
})
export class RecordsTableModule { }
