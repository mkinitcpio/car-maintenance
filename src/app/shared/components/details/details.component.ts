import { Component, input } from '@angular/core';
import { CmTextHeader } from '@shared/components/typography/text-header/text-header';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CmButton } from '../button/button';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    imports: [CommonModule, MatIconModule, CmTextHeader, CmButton]
})
export class DetailsComponent {

  private readonly SIDEBAR_WIDTH = '300px';
  private readonly RIGHT_BORDER_WIDTH = '16px';

  public readonly FULL_WIDTH = '100%';
  public readonly PAGE_WITH_SIDEBAR_WIDTH = `calc(${this.FULL_WIDTH} - ${this.SIDEBAR_WIDTH})`;
  public readonly PAGE_CONTENT_WIDTH = `calc(${this.FULL_WIDTH} - ${this.RIGHT_BORDER_WIDTH})`;
  public readonly PAGE_CONTENT_WIDTH_WITH_SIDEBAR = `calc(${this.FULL_WIDTH} - ${this.SIDEBAR_WIDTH} - ${this.RIGHT_BORDER_WIDTH})`;

  public showSidebar = false;

  title = input<string>('');

  icon = input<string>('');

  separated = input<boolean>(false);

  sidebarButtonIcon = input<string>();

  sidebarTitle = input<string>();
}
