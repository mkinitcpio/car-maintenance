import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavigationTrackerService {
  public collapse$: Subject<boolean> = new Subject();
}
