import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent, RecordsTableModule } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';

import { DialogManagerService } from './services/dialog-manager.service';
import { CreateRecordComponent } from './components/create-record/create-record.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    CreateDialogComponent,
    CreateRecordComponent,
  ],
  providers: [
    DialogManagerService
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    MaterialModule,
    RecordsTableModule,
  ],
})
export class SharedModule {}
