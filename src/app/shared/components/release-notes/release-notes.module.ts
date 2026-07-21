import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseNotesComponent } from './release-notes.component';
import { ReleaseNotesService } from './release-notes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';
import { UbuntuContainerModule } from '@shared/ubuntu/ubuntu-container/ubuntu-container.module';
import { DialogModule } from '../dialog/dialog.module';
import { ContentContainerModule } from '../content-container/content-container.module';
import { CmTextBody } from "../typography/text-body/text-body";
import { CmTextHeader } from "../typography/text-header/text-header";

@NgModule({
  declarations: [
    ReleaseNotesComponent
  ],
  providers: [
    ReleaseNotesService,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    TranslateModule,
    MatDividerModule,
    UbuntuContainerModule,
    DialogModule,
    ContentContainerModule,
    CmTextBody,
    CmTextHeader
]
})
export class ReleaseNotesModule { }
