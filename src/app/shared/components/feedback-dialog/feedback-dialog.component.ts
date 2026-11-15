import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CmTextBody } from '../typography/text-body/text-body';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogComponent } from '../dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CmInput } from '../input/input';

import { Feedback, FeedbackDialogData, FeedbackTypeOption } from './interfaces';
import { FeedbackTypeEnum } from './feedback-type.enum';

import { feedbackTypeOptions } from './feedback-type-options';
import { Subject } from 'rxjs';
import { Notification } from '@shared/components/notification/interfaces';
import { NotificationTypeEnum } from '../notification/notification-type.enum';
import { FeedbackRepository } from '@core/repositories/feedback.repository';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-feedback-dialog',
    templateUrl: './feedback-dialog.component.html',
    imports: [
        CommonModule,
        DialogComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        TranslateModule,
        MatIconModule,
        CmTextBody,
        CmInput,
    ]
})
export class FeedbackDialogComponent implements OnInit {

  public feedbackForm = new FormGroup({
    name: this.fb.control("Some name"),
    message: this.fb.control(null, [Validators.required]),
    email: this.fb.control(null, [
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z.-]{2,}\.[a-zA-Z]{2,}$/),
    ]),
    type: this.fb.control(this.data.type || FeedbackTypeEnum.Feature),
  });

  public FeedbackTypeEnum = FeedbackTypeEnum;
  public feedbackTypeOptions: FeedbackTypeOption[] = feedbackTypeOptions;

  public notification$: Subject<Notification> = new Subject();
  public loading$: Subject<boolean> = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FeedbackDialogData,
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private fb: FormBuilder,
    private feedbackRepository: FeedbackRepository,
  ) { }

  ngOnInit(): void {}

  public onSend(): void {
    this.feedbackForm.markAllAsTouched();

    if(this.feedbackForm.invalid) return;

    this.loading$.next(true);
    this.feedbackRepository.sendFeedback(this.feedbackForm.value as Feedback)
      .subscribe(() => {
        this.loading$.next(false);
        this.notification$.next({
          type: NotificationTypeEnum.Success,
          text: "Successfully sent!",
        });
      }, () => {
        this.loading$.next(false);
        this.notification$.next({
          type: NotificationTypeEnum.Error,
          text: "Error!",
        });
      });
  }

  public get disbaleSubmitButton(): boolean {
    return this.feedbackForm.invalid;
  }
}
