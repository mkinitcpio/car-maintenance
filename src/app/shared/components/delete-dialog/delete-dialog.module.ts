import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../button/button.module';
import { CmButton } from '../button/button';
import { CmTextHeader } from "../typography/text-header/text-header";

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    CmButton,
    ButtonModule,
    CmTextHeader,
],
  exports: [
    DeleteDialogComponent,
  ]
})
export class DeleteDialogModule { }
