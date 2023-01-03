import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormModeEnum } from './form-mode.enum';

import { v4 as uuidv4 } from 'uuid';
import { icons } from './icons';
import { SettingsService } from '../settings/settings.service';
import { CategoryTypeEnum } from 'app/navigation/state/interface';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  public icons = icons;
  public iconsPath: string = null;

  public categoryForm = new FormGroup({
    id: new FormControl(uuidv4()),
    name: new FormControl(null, Validators.required),
    parent: new FormControl(this.data.parentId),
    illustration: new FormControl('wrench'),
    type: new FormControl(CategoryTypeEnum.Category),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    public settingsService: SettingsService,
    public translateService: TranslateService,
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

  public get title(): Observable<string> {
    return combineLatest([
      this.translateService.get(this.data.mode === 0 ? "DIALOG.ADD" : "DIALOG.EDIT"),
      this.translateService.get("DIALOG.CATEGORY"),
    ]).pipe(map(([mode, dialogType]) => `${mode as string} ${dialogType as string}`));
  }
}
