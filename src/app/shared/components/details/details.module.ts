import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { ButtonModule } from '../button/button.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MatIconModule,
  ],
  exports: [
    DetailsComponent,
  ]
})
export class DetailsModule { }
