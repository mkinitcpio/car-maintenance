import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    DeleteDialogComponent,
  ]
})
export class DeleteDialogModule { }
