import { Component, Input, OnInit } from '@angular/core';

type DashboardItemSize = 'm' | 's';
type DashboardContentType = 'changelog' | 'feedback' | 'sourceCode' | 'documentation';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent implements OnInit {

  @Input()
  external: boolean;

  @Input()
  type: DashboardContentType;

  @Input()
  size: DashboardItemSize = 'm';

  @Input()
  header: string;

  @Input()
  description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
