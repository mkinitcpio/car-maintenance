import { Component, computed, inject, Inject, model, OnInit } from '@angular/core';
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
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DataBaseService } from '@core/database';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {

  public settingsService: SettingsService = inject(SettingsService);

  public readonly allLabels: string[];

  readonly currentLabel = model('');
  readonly filteredLabels = computed(() => {
    const currentLabel = this.currentLabel().toLowerCase();

    return currentLabel
      ? this.allLabels.filter(label => label.toLowerCase().includes(currentLabel))
      : this.allLabels.slice();
  });

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
    labels: this.fb.control([]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateRecordComponentData,
    public dialogRef: MatDialogRef<CreateRecordComponent>,
    private fb: FormBuilder,
    private translateService: TranslateService,
    database: DataBaseService,
  ) {
    this.allLabels = database.getLabels();
  }


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
    return combineLatest<[string, string]>([
      this.translateService.get(this.data.mode === 0 ? "DIALOG.ADD" : "DIALOG.EDIT"),
      this.translateService.get("DIALOG.RECORD"),
    ]).pipe(map(([mode, dialogType]) => `${mode} ${dialogType}`));
  }

  public removeLabel(index: number): void {
    const labels = [...this.recordForm.get('labels').value];

    if(index >= 0) {
      labels.splice(index, 1);
      this.recordForm.get('labels').patchValue(labels);
    }
  }

  public addLabel(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const labels = [...this.recordForm.get('labels').value];

      labels.push(value);
      this.recordForm.get('labels').patchValue(labels);
      this.currentLabel.set('');
      event.chipInput!.clear();
    }
  }

  public selectLabel(event: MatAutocompleteSelectedEvent): void {
    const labels = this.recordForm.get('labels').value;

    labels.push(event.option.viewValue);
    this.recordForm.get('labels').patchValue(labels);
    this.currentLabel.set('');
    event.option.deselect();
  }
}
