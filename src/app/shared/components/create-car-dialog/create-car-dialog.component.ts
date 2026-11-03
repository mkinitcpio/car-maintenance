import { Badge } from './../badge/badge';
import { Accordion } from '../accordion/accordion';
import { afterNextRender, ChangeDetectionStrategy, Component, Inject, Injector, OnInit, viewChildren } from '@angular/core';
import { CmInput } from '../input/input';
import { DialogComponent } from '../dialog/dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
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
import { CmButton } from '../button/button';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-create-car-dialog',
    templateUrl: './create-car-dialog.component.html',
    styleUrls: ['./create-car-dialog.component.scss'],
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    TranslateModule,
    MatIconModule,
    DialogComponent,
    CmButton,
    CmInput,
    Accordion,
    Badge,
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

  private readonly partInputs = viewChildren<CmInput>('partInput');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    public settingsService: SettingsService,
    public fb: FormBuilder,
    private translateService: TranslateService,
    private injector: Injector,
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
    afterNextRender(() => {
      const partInputs = this.partInputs();
      partInputs[partInputs.length - 1]?.focus();
    }, { injector: this.injector });
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

  public isInvalid(controlName: string): boolean {
    const control = this.carForm.get(controlName);
    return control.touched && control.invalid;
  }

  public getErrorMessage(controlName: string): string | undefined {
    const control = this.carForm.get(controlName);

    if (!control.touched || control.valid) {
      return undefined;
    }
    if (control.hasError('required')) {
      return 'DIALOG.VALIDATIONS.NAME';
    }

    if (control.hasError('number')) {
      return control.getError('number').value;
    }
    if (control.hasError('positiveNumber')) {
      return control.getError('positiveNumber').value;
    }

    return undefined;
  }

  public isPartInvalid(index: number): boolean {
    const control = this.parts.at(index);
    return control.touched && control.invalid;
  }

  public getPartErrorMessage(index: number): string | undefined {
    return this.isPartInvalid(index) ? 'DIALOG.VALIDATIONS.NAME' : undefined;
  }
}
