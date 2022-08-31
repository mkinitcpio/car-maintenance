import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DetailsComponent,
  ]
})
export class DetailsModule { }
