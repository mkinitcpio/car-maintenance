import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveDialogComponent } from './move-dialog.component';
import { DialogModule } from '../dialog/dialog.module';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { CmTextHeader } from "../typography/text-header/text-header";
import { CmTextBody } from "../typography/text-body/text-body";

@NgModule({
  declarations: [
    MoveDialogComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule,
    CmTextHeader,
    CmTextBody
],
  exports: [
    MoveDialogComponent,
  ]
})
export class MoveDialogModule { }
