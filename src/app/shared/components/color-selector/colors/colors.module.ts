import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsComponent } from './colors.component';
import { ColorComponent } from './color/color.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ColorsComponent,
    ColorComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    ColorsComponent,
  ]
})
export class ColorsModule { }
