import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormModeEnum } from '../create-dialog/form-mode.enum';

import { CreateRecordComponentData } from './interface';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {

  public recordForm = new FormGroup({
    id: this.fb.control(uuidv4()),
    name: this.fb.control(null, Validators.required),
    cost: this.fb.control(null),
    date: this.fb.control(null),
    notes: this.fb.control(null),
    parent: this.fb.control(this.data.parent),
    mileage: this.fb.control(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateRecordComponentData,
    public dialogRef: MatDialogRef<CreateRecordComponent>,
    private fb: FormBuilder,
  ) {}


  ngOnInit(): void {
    if(this.data.mode === FormModeEnum.Edit) {
      this.recordForm.setValue(this.data.formData);
    }
  }

  public onSubmit(): void {
    this.recordForm.markAllAsTouched();
    if(this.recordForm.valid) {
      this.dialogRef.close(this.recordForm.value);
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
