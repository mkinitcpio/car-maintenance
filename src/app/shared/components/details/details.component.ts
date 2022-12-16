import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  private readonly SIDEBAR_WIDTH = '300px';
  private readonly RIGHT_BORDER_WIDTH = '16px';

  public readonly FULL_WIDTH = '100%';
  public readonly PAGE_WITH_SIDEBAR_WIDTH = `calc(${this.FULL_WIDTH} - ${this.SIDEBAR_WIDTH})`;
  public readonly PAGE_CONTENT_WIDTH = `calc(${this.FULL_WIDTH} - ${this.RIGHT_BORDER_WIDTH})`;
  public readonly PAGE_CONTENT_WIDTH_WITH_SIDEBAR = `calc(${this.FULL_WIDTH} - ${this.SIDEBAR_WIDTH} - ${this.RIGHT_BORDER_WIDTH})`;

  public showSidebar = false;

  @Input()
  title = '';

  @Input()
  separated = false;

  @Input()
  sidebarButtonIcon: string;

  @Input()
  sidebarTitle: string;
}
