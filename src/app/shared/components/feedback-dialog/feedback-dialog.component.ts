import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent implements OnInit {

  public feedbackForm = new FormGroup({
    id: this.fb.control(uuidv4()),
    text: this.fb.control(null),
    type: this.fb.control(0),
  });

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
