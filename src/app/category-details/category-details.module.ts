import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDetailsComponent } from './category-details.component';
import { RecordsTableModule } from '../shared/components';

@NgModule({
  declarations: [CategoryDetailsComponent],
  imports: [
    CommonModule,
    RecordsTableModule,
  ]
})
export class CategoryDetailsModule { }
