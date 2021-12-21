import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormModeEnum } from './form-mode.enum';

import { v4 as uuidv4 } from 'uuid';
import { categoryIllustrationOptions } from './category-illustration-options';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  public categoryIllustrationOptions = categoryIllustrationOptions;
  public iconsPath: string = null;

  public categoryForm = new FormGroup({
    id: new FormControl(uuidv4()),
    name: new FormControl(null, Validators.required),
    parent: new FormControl(this.data.parentId),
    illustration: new FormControl(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    public settingsService: SettingsService,
  ) {}


  ngOnInit(): void {
    if(this.data.mode === FormModeEnum.Edit) {
      this.data.formData.illustration = this.data.formData.illustration || null,
      this.categoryForm.setValue(this.data.formData);
    }

    this.iconsPath = `assets/category-icons/${this.settingsService.settings.appearance.iconPack}/${this.settingsService.settings.appearance.type}/`;
  }

  public onSubmit(): void {
    this.categoryForm.markAllAsTouched();
    if(this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value);
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public getIllustrationName(value: string): string {
    return this.categoryIllustrationOptions.find(option => option.value === value)?.name;
  }
}
