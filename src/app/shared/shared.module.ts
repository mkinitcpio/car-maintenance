import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent, RecordsTableModule } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';

import { DialogManagerService } from './services/dialog-manager.service';
import { UtilsService } from './services/utils.service';
import { PrintService } from './services/print.service';
import { CreateRecordModule } from './components/create-record/create-record.module';
import { CreateDialogModule } from './components/create-dialog/create-dialog.module';
import { CreateCarDialogModule } from './components/create-car-dialog/create-car-dialog.module';
import { ReleaseNotesModule } from './components/release-notes/release-notes.module';
import { DeleteDialogModule } from './components/delete-dialog/delete-dialog.module';
import { SettingsModule } from './components/settings/settings.module';
import { UbuntuContainerModule } from './ubuntu/ubuntu-container/ubuntu-container.module';
import { PrintDialogModule } from './components/print-dialog/print-dialog.module';
import { TabsModule } from './components/tabs/tabs.module';
import { ColorSelectorModule } from './components/color-selector/color-selector.module';
import { AccountDialogModule } from './components/account-dialog/account-dialog.module';
import { FeedbackDialogModule } from './components/feedback-dialog/feedback-dialog.module';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
  ],
  providers: [
    DialogManagerService,
    PrintService,
    UtilsService,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CreateRecordModule,
    CreateDialogModule,
    CreateCarDialogModule,
    ReleaseNotesModule,
    DeleteDialogModule,
    UbuntuContainerModule,
    PrintDialogModule,
    TabsModule,
    ColorSelectorModule,
    AccountDialogModule,
    FeedbackDialogModule,
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
