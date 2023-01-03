import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDialogComponent } from './account-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from '../dialog/dialog.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AccountDialogComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule,
  ]
})
export class AccountDialogModule { }
