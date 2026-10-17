import { Component, Inject, OnInit } from '@angular/core';
import { CmTextBody } from '../typography/text-body/text-body';
import { TabsComponent } from '../tabs/tabs.component';
import { ContentContainerComponent } from '../content-container/content-container.component';
import { ButtonComponent } from '../button/button.component';
import { DialogComponent } from '../dialog/dialog.component';
import { UbuntuContainerComponent } from '@shared/ubuntu/ubuntu-container/ubuntu-container.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { SettingsService } from '../settings/settings.service';

import * as CustomValidators from '../create-record/validators';

import { v4 as uuidv4 } from 'uuid';
import { FormModeEnum } from '../create-dialog/form-mode.enum';
import { CategoryTypeEnum } from '@core/state/features/car-category/enums';

import { Data } from './interface';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-create-car-dialog',
    templateUrl: './create-car-dialog.component.html',
    styleUrls: ['./create-car-dialog.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        TranslateModule,
        MatIconModule,
        MatTooltipModule,
        UbuntuContainerComponent,
        DialogComponent,
        ButtonComponent,
        ContentContainerComponent,
        TabsComponent,
        CmTextBody,
    ]
})
export class CreateCarDialogComponent implements OnInit {

  public carForm = new FormGroup({
    id: new FormControl(uuidv4()),
    name: new FormControl(null, Validators.required),
    vehicleId: new FormControl(null),
    make: new FormControl(null),
    model: new FormControl(null),
    year: new FormControl(null, [
      CustomValidators.numberValidator,
      CustomValidators.positiveNumberValidator,
    ]),
    engine: new FormControl(null),
    mileage: new FormControl(null, [
      CustomValidators.numberValidator,
      CustomValidators.positiveNumberValidator,
    ]),
    illustration: new FormControl('wheel-1.svg'),
    parts: new FormArray([]),
    type: new FormControl(CategoryTypeEnum.Car),
  });

  public disablePartsForm = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    public settingsService: SettingsService,
    public fb: FormBuilder,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    if(this.data.mode === FormModeEnum.Edit) {
      this.disablePartsForm = true;
      const {parts, ...data} = this.data.formData;
      this.carForm.patchValue(data);
      this.carForm.setControl('parts', this.fb.array(parts.map((p: any) => ({
        value: p.name,
        disabled: true,
      }))));
    }
  }

  public onSubmit(): void {
    this.carForm.markAllAsTouched();
    if(this.carForm.valid) {
      this.dialogRef.close(this.carForm.value);
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public addPart(): void {
    this.parts.push(new FormControl(null, Validators.required));
  }

  public get parts(): FormArray {
    return this.carForm.get('parts') as FormArray;
  }

  public onDeletePart(index: number): void {
    this.parts.removeAt(index);
  }

  public get title(): Observable<string> {
    return combineLatest([
      this.translateService.get(this.data.mode === 0 ? "DIALOG.ADD" : "DIALOG.EDIT"),
      this.translateService.get("DIALOG.CAR"),
    ]).pipe(map(([mode, dialogType]) => `${mode as string} ${dialogType as string}`));
  }
}
