import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent, RecordsTableModule } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';

import { DialogManagerService } from './services/dialog-manager.service';
import { CreateRecordModule } from './components/create-record/create-record.module';
import { CreateDialogModule } from './components/create-dialog/create-dialog.module';
import { ReleaseNotesModule } from './components/release-notes/release-notes.module';
import { DeleteDialogModule } from './components/delete-dialog/delete-dialog.module';
import { SettingsModule } from './components/settings/settings.module';
import { UbuntuCloseButtonModule } from './ubuntu/ubuntu-close-button/ubuntu-close-button.module';
import { UbuntuContainerModule } from './ubuntu/ubuntu-container/ubuntu-container.module';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
  ],
  providers: [
    DialogManagerService,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CreateRecordModule,
    CreateDialogModule,
    ReleaseNotesModule,
    DeleteDialogModule,
    UbuntuCloseButtonModule,
    UbuntuContainerModule,
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    MaterialModule,
    RecordsTableModule,
    SettingsModule,
  ],
})
export class SharedModule {}
