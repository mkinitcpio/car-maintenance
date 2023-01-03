import { ChangeDetectorRef, Component, ElementRef, OnInit, Self } from '@angular/core';
import { ElectronService } from '@core/services';
import { ReleaseNotes } from '@shared/components/release-notes/interface';
import { DialogManagerService } from '@shared/services/dialog-manager.service';

import { ResizeObserverService } from '@shared/services/resize-observer.service';

const releaseNotes: ReleaseNotes = require('../release-notes.json');


type GridView = 'compact' | 'normal' | 'medium';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ ResizeObserverService ]
})
export class DashboardComponent implements OnInit {

  private readonly GITHUB_REPOSITORY_URL = "https://github.com/mkinitcpio/car-maintenance";
  private readonly DOCUMENTATION_URL = "https://mkinitcpio.gitbook.io/car-maintenance-1/";
  public gridView: GridView;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
    private electronService: ElectronService,
    private dialogService: DialogManagerService,
    @Self() private resizeObserverService: ResizeObserverService,
  ) {}

  ngOnInit(): void {
    const pageContentElementRef = this.elementRef.nativeElement.querySelector(".page__content");

    this.resizeObserverService.observe(
      pageContentElementRef as HTMLElement,
      [[587, 'compact'], [900, 'medium'], [Infinity, 'normal']]
    ).subscribe((size: GridView) => {
      this.gridView = size;
      this.changeDetectorRef.detectChanges();
    });
  }

  public openGitHub(): void {
    this.electronService.shell.openExternal(this.GITHUB_REPOSITORY_URL);
  }

  public openReleaseNotes(): void {
    this.dialogService.openReleaseNotesDialog(releaseNotes);
  }

  public openDocumentation(): void {
    this.electronService.shell.openExternal(this.DOCUMENTATION_URL);
  }

  public openFeedbackDialog(): void {
    this.dialogService.openFeedbackDialog();
  }
}
