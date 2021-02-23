import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { text: string, name: string },
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
