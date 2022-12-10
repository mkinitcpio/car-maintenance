import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Feedback, FeedbackDialogData, FeedbackTypeOption } from './interfaces';
import { FeedbackTypeEnum } from './feedback-type.enum';

import { feedbackTypeOptions } from './feedback-type-options';
import { Subject } from 'rxjs';
import { Notification } from '@shared/components/notification/interfaces';
import { NotificationTypeEnum } from '../notification/notification-type.enum';
import { FeedbackRepository } from '@core/repositories/feedback.repository';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent implements OnInit {

  public feedbackForm = new FormGroup({
    text: this.fb.control(null),
    email: this.fb.control(null),
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
