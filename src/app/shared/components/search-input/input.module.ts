import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
  ],
  exports: [
    InputComponent,
  ]
})
export class InputModule { }
