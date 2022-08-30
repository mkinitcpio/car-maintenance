import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { CreateDialogComponent } from './create-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from '../dialog/dialog.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CreateDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    TranslateModule,
    DialogModule,
    MatIconModule,
  ],
  entryComponents: [
    CreateDialogComponent,
  ]
})
export class CreateDialogModule {}
