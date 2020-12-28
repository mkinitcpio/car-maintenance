import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormModeEnum } from './form-mode.enum';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  public categoryForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    parent: new FormControl(null),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {parents: Array<any>},
    public dialogRef: MatDialogRef<CreateDialogComponent>
  ) {}


  ngOnInit(): void {
    if(this.data.mode === FormModeEnum.Edit) {
      this.categoryForm.setValue(this.data.formData);
    }
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

}
