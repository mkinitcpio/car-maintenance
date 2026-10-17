import { Component, Inject, OnInit } from '@angular/core';
import { CmTextBody } from '../typography/text-body/text-body';
import { CmTextHeader } from '../typography/text-header/text-header';
import { ButtonComponent } from '../button/button.component';
import { CmButton } from '../button/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        MatIconModule,
        CmButton,
        ButtonComponent,
        CmTextHeader,
        CmTextBody,
    ]
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { text: string, params: { name: string } },
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.dialogRef.close(true);
  }

  public onClose(): void {
    this.dialogRef.close(false);
  }
}
