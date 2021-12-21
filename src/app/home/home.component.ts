import { Component, OnInit } from '@angular/core';
import { ReleaseNotesService } from '../shared/components/release-notes/release-notes.service';
import { SideNavigationTrackerService } from './side-navigation-tracker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private releaseNotesService: ReleaseNotesService,
    public sideNavTracker: SideNavigationTrackerService,
  ) {}

  ngOnInit(): void {
    if(this.releaseNotesService.isFirstAppStartAfterUpdate()) {
      this.releaseNotesService.showReleaseNotes();
    }
  }
}
