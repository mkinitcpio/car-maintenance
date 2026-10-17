import { Component, Input } from '@angular/core';
import { CmTextHeader } from '@shared/components/typography/text-header/text-header';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    imports: [CommonModule, ButtonComponent, MatIconModule, CmTextHeader]
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
  icon = '';

  @Input()
  separated = false;

  @Input()
  sidebarButtonIcon: string;

  @Input()
  sidebarTitle: string;
}
