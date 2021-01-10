import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormModeEnum } from '../../navigation/create-dialog/form-mode.enum';

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
    parent: this.fb.control(this.data.parent),
    cost: this.fb.control(null),
    date: this.fb.control(null),
    mileage: this.fb.control(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
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
