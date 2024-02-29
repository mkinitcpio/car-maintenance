import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveDialogComponent } from './move-dialog.component';
import { DialogModule } from '../dialog/dialog.module';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
// import { InputModule } from '../search-input/input.module';

@NgModule({
  declarations: [
    MoveDialogComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    MatIconModule,
    MatRippleModule,
    // InputModule,
  ],
  exports: [
    MoveDialogComponent,
  ]
})
export class MoveDialogModule { }
