import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MatRippleModule,
  ],
  exports: [
    ButtonComponent,
  ]
})
export class ButtonModule { }
