import { Component, OnInit } from '@angular/core';
import { SideNavigationTrackerService } from 'app/home/side-navigation-tracker.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  constructor(
    public sideNavTracker: SideNavigationTrackerService,
  ) { }

  ngOnInit(): void {
  }

}
