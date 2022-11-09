import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackDialogComponent } from './feedback-dialog.component';
import { DialogModule } from '../dialog/dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    FeedbackDialogComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
  ],
  exports: [
    FeedbackDialogComponent,
  ]
})
export class FeedbackDialogModule { }
