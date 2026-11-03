import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, EventEmitter, input, Input, OnInit, output, Output, ViewChild } from '@angular/core';
import { CmTextBody } from '../typography/text-body/text-body';
import { MatBadgeModule } from '@angular/material/badge';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Tab } from './interface';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    imports: [CommonModule, TranslateModule, MatBadgeModule]
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
