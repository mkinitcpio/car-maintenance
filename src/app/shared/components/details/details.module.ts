import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { ButtonModule } from '../button/button.module';
import { MatIconModule } from '@angular/material/icon';
import { CmTextHeader } from '@shared/components/typography/text-header/text-header';

@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MatIconModule,
    CmTextHeader,
  ],
  exports: [
    DetailsComponent,
  ]
})
export class DetailsModule { }
