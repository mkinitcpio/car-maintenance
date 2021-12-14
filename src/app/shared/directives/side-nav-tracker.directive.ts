import { Directive, HostListener } from '@angular/core';
import { SideNavigationTrackerService } from '../../home/side-navigation-tracker.service';

@Directive({
  selector: '[appSideNavTracker]'
})
export class SideNavTrackerDirective {

  private collapse = false;

  constructor(private sideNavTracker: SideNavigationTrackerService) { }

  @HostListener('click', ['$event'])
  onClick(): void {
    this.collapse = !this.collapse;
    this.sideNavTracker.collapse$.next(this.collapse);
  }
}
