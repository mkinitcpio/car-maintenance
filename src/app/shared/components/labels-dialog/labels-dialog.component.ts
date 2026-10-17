import { Component, inject } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'cm-labels-dialog',
    imports: [
        DialogComponent,
    ],
    templateUrl: './labels-dialog.component.html',
    styleUrl: './labels-dialog.component.scss'
})
export class LabelsDialogComponent {

  labels = inject<string[]>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<LabelsDialogComponent>);

}
