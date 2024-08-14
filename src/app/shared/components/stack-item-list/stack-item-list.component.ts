import { Component, input, output } from '@angular/core';

import { StackItem } from './interface';
import { imports } from './stack-item-list.imports';

@Component({
  standalone: true,
  imports,
  selector: 'cm-stack-item-list',
  templateUrl: './stack-item-list.component.html',
  styleUrls: ['./stack-item-list.component.scss'],
})
export class StackItemListComponent {

  items = input.required<StackItem[]>();
  showMore = output<void>();

  public readonly maxCount = 3;

  public onShowMore(event: MouseEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.showMore.emit();
  }
}
