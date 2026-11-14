import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { Tab } from './interface';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {

  tabs = input<Tab[]>();

  readonly index = input<number>();

  bordered = input<boolean>();

  badgesVisibilityArray = input<boolean[]>([true, true]);

  selectedTabIndex = output<number>();

  public selectedtab = 0;
  public _tabWidth = 0;

  constructor() {
    effect(() => {
      const index = this.index();
      this.selectedtab = index;
    })
  }

  public onTabSelect(index: number): void {
    this.selectedtab = index;
    this.selectedTabIndex.emit(index);
  }
}
