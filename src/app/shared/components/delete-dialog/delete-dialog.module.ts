import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
  ],
  exports: [
    DeleteDialogComponent,
  ]
})
export class DeleteDialogModule { }
