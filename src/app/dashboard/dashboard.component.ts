import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Self } from '@angular/core';
import { ElectronService } from '@core/services';
import { ReleaseNotes } from '@shared/components/release-notes/interface';
import { SettingsService } from '@shared/components/settings/settings.service';
import { DialogManagerService } from '@shared/services/dialog-manager.service';

import { ResizeObserverService } from '@shared/services/resize-observer.service';
import { APP_CONFIG, AppConfig } from 'app/app.config';

const releaseNotes: ReleaseNotes = require('../release-notes.json');


type GridView = 'compact' | 'normal' | 'medium';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ ResizeObserverService ]
})
export class DashboardComponent implements OnInit {

  public gridView: GridView;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
    private electronService: ElectronService,
    private dialogService: DialogManagerService,
    @Self() private resizeObserverService: ResizeObserverService,
    private settingsService: SettingsService,
    @Inject(APP_CONFIG) public appConfig: AppConfig,
  ) {}

  ngOnInit(): void {
    const pageContentElementRef = this.elementRef.nativeElement.querySelector<HTMLElement>(".page__content");

    this.resizeObserverService.observe(
      pageContentElementRef,
      [[587, 'compact'], [900, 'medium'], [Infinity, 'normal']]
    ).subscribe((size: GridView) => {
      this.gridView = size;
      this.changeDetectorRef.detectChanges();
    });
  }

  public openGitHub(): void {
    this.electronService.shell.openExternal(this.appConfig.sourceCodeUrl);
  }

  public openReleaseNotes(): void {
    this.dialogService.openReleaseNotesDialog(releaseNotes);
  }

  public openDocumentation(): void {
    const documentationUrl = `${this.appConfig.documentationUrl}-${this.settingsService.settings.language}`;

    this.electronService.shell.openExternal(documentationUrl);
  }

  public openFeedbackDialog(): void {
    this.dialogService.openFeedbackDialog();
  }
}
