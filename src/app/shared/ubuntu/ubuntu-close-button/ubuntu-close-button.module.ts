import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbuntuCloseButtonComponent } from './ubuntu-close-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [UbuntuCloseButtonComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    UbuntuCloseButtonComponent,
  ]
})
export class UbuntuCloseButtonModule { }
