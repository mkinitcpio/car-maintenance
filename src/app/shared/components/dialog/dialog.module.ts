import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '../button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DialogComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
  ],
  exports: [
    DialogComponent,
  ]
})
export class DialogModule { }
