import { Component, Input } from '@angular/core';

import { StackItem } from './interface';

@Component({
  selector: 'stack-item-list',
  templateUrl: './stack-item-list.component.html',
  styleUrls: ['./stack-item-list.component.scss']
})
export class StackItemListComponent {

  @Input() items: Array<StackItem>;

  public readonly maxCount = 3;
  public showMore = true;

  public onShowMore(): void {
  }
}
