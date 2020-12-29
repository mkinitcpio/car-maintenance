import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [EmptyComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    EmptyComponent,
  ]
})
export class EmptyModule { }
