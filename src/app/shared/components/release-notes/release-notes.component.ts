import { inject, Inject, OnInit } from '@angular/core';
import { CmTextHeader } from '../typography/text-header/text-header';
import { CmTextBody } from '../typography/text-body/text-body';
import { ContentContainerComponent } from '../content-container/content-container.component';
import { DialogComponent } from '../dialog/dialog.component';
import { UbuntuContainerComponent } from '@shared/ubuntu/ubuntu-container/ubuntu-container.component';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { SettingsService } from '../settings/settings.service';
import { AppConfig, APP_CONFIG } from 'app/app.config';

interface ReleaseNote {
  title: string;
  news: string[];
};

@Component({
    selector: 'app-release-notes',
    templateUrl: './release-notes.component.html',
    styleUrls: ['./release-notes.component.scss'],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        TranslateModule,
        MatDividerModule,
        UbuntuContainerComponent,
        DialogComponent,
        ContentContainerComponent,
        CmTextBody,
        CmTextHeader,
    ]
})
export class ReleaseNotesComponent implements OnInit {

  public appConfig = inject<AppConfig>(APP_CONFIG);
  public dialogRef = inject(MatDialogRef<CreateRecordComponent>);

  private settingsService = inject(SettingsService);
  private releaseNotesData = inject<{[key: string]: ReleaseNote[]}>(MAT_DIALOG_DATA);

  public releaseNotes: ReleaseNote[];

  constructor() {

  }

  ngOnInit(): void {
    this.releaseNotes = this.releaseNotesData[this.settingsService.settings.language];
  }
}
