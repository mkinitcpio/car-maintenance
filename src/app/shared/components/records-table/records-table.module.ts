import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecordsTableComponent} from './records-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [RecordsTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    RecordsTableComponent,
  ]
})
export class RecordsTableModule { }
