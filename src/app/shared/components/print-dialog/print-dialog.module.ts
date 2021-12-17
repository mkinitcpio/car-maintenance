import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintDialogComponent } from './print-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecordsTableModule } from '..';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    PrintDialogComponent,
    PreviewPageComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    TranslateModule,
    MatProgressSpinnerModule,
    RecordsTableModule,
    MatTableModule,
  ],
  exports: [
    PrintDialogComponent,
  ]
})
export class PrintDialogModule { }
