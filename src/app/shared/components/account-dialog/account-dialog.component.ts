import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-account-dialog',
    templateUrl: './account-dialog.component.html',
    styleUrls: ['./account-dialog.component.scss'],
    imports: [
        CommonModule,
        DialogComponent,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        TranslateModule,
    ]
})
export class AccountDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
