import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormModeEnum } from '../create-dialog/form-mode.enum';
import * as CustomValidators from './validators';

import { CreateRecordComponentData } from './interface';

import { v4 as uuidv4 } from 'uuid';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {

  public settingsService: SettingsService = inject(SettingsService);

  public recordForm = new FormGroup({
    id: this.fb.control(uuidv4()),
    name: this.fb.control(null, Validators.required),
    cost: this.fb.control(null, [
      CustomValidators.numberValidator,
      CustomValidators.positiveNumberValidator,
    ]),
    date: this.fb.control(new Date()),
    notes: this.fb.control(null),
    parent: this.fb.control(this.data.parent),
    mileage: this.fb.control(null, [
      CustomValidators.numberValidator,
      CustomValidators.positiveNumberValidator,
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateRecordComponentData,
    public dialogRef: MatDialogRef<CreateRecordComponent>,
    private fb: FormBuilder,
    private translateService: TranslateService,
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

  public get title(): Observable<string> {
    return combineLatest([
      this.translateService.get(this.data.mode === 0 ? "DIALOG.ADD" : "DIALOG.EDIT"),
      this.translateService.get("DIALOG.RECORD"),
    ]).pipe(map(([mode, dialogType]) => `${mode as string} ${dialogType as string}`));
  }
}
