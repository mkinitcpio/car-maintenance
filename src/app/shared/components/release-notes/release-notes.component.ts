import { ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { CmTextBody } from '../typography/text-body/text-body';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import type { CreateRecordComponent } from '../../../maintenance/dialogs/create-record/create-record.component';
import { SettingsService } from '../settings/settings.service';
import { AppConfig, APP_CONFIG } from 'app/app.config';
import { Accordion } from '../accordion/accordion';
import { ExternalLinkService } from '@core/services';

interface ReleaseNote {
  title: string;
  icon: string;
  news: string[];
};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        DialogComponent,
        CmTextBody,
        Accordion,
    ]
})
export class ReleaseNotesComponent implements OnInit {

  public appConfig = inject<AppConfig>(APP_CONFIG);
  public dialogRef = inject(MatDialogRef<CreateRecordComponent>);

  private settingsService = inject(SettingsService);
  private externalLinkService = inject(ExternalLinkService);
  private releaseNotesData = inject<{ [key: string]: ReleaseNote[] }>(MAT_DIALOG_DATA);

  public releaseNotes: ReleaseNote[];

  public openedAccordion = signal<number>(0);

  constructor() {

  }

  ngOnInit(): void {
    this.releaseNotes = this.releaseNotesData[this.settingsService.settings.language];
  }

  public onListClick(event: MouseEvent): void {
    const link = (event.target as HTMLElement).closest('a');

    if (!link) {
      return;
    }

    event.preventDefault();
    this.externalLinkService.open(link.href);
  }
}
