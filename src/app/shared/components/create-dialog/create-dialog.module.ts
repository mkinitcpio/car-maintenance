import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { CreateDialogComponent } from './create-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UbuntuCloseButtonModule } from '../../ubuntu/ubuntu-close-button/ubuntu-close-button.module';
import { TranslateModule } from '@ngx-translate/core';

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
    MatButtonModule,
    MatDatepickerModule,
    UbuntuCloseButtonModule,
    TranslateModule,
  ],
  entryComponents: [
    CreateDialogComponent,
  ]
})
export class CreateDialogModule {}
