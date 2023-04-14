import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyDialogComponent } from './currency-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '../dialog/dialog.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonPipesModule } from '@shared/pipes/common-pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CurrencyDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonPipesModule,
    TranslateModule,
  ],
  exports: [
    CurrencyDialogComponent,
  ]
})
export class CurrencyDialogModule { }
