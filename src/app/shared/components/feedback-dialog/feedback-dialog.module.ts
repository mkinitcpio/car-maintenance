import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackDialogComponent } from './feedback-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UbuntuCloseButtonModule } from '../../ubuntu/ubuntu-close-button/ubuntu-close-button.module';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackRepository } from './feedback.repository';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    FeedbackDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    UbuntuCloseButtonModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [
    FeedbackRepository,
  ],
  exports: [
    FeedbackDialogComponent,
  ],
})
export class FeedbackDialogModule { }
