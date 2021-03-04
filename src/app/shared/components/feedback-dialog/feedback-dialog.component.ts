import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { timer } from 'rxjs';

import { feedbackTypeOptions } from './feedback-type-options';
import { FeedbackRepository } from './feedback.repository';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent implements OnInit {

  public feedbackTypeOptions = feedbackTypeOptions;
  public hasError = false;
  public success = false;
  public loading = false;

  public feedbackForm = new FormGroup({
    type: this.fb.control(this.feedbackTypeOptions[1].value),
    text: this.fb.control(null, Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private feedbackRepository: FeedbackRepository,
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
  ) { }

  ngOnInit(): void {}

  public onSubmit(): void {
    this.hasError = false;
    this.success = false;
    this.feedbackForm.markAllAsTouched();
    
    if(this.feedbackForm.invalid) {
      return;
    }

    this.loading = true;
    this.feedbackRepository
      .postFeedback(this.feedbackForm.value)
      .subscribe(() => {
        this.success = true;
        this.loading = false;
        timer(1000).subscribe(() => {
          this.dialogRef.close();
        });
      }, () => {
        this.hasError = true;
        this.loading = false;
      });
  }

}
