import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, input, output } from '@angular/core';
import { CmTextBody } from '../typography/text-body/text-body';
import { MatBadgeModule } from '@angular/material/badge';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Tab } from './interface';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    imports: [CommonModule, TranslateModule, MatBadgeModule, CmTextBody, MatIcon]
})
export class TabsComponent implements OnInit, AfterViewInit {

  @ViewChild('tabCoverRef', {static: true}) tabCoverRef: ElementRef;
  @ViewChild('tabsRef', {static: true}) tabsRef: ElementRef;
  @ViewChild('tabsTitle', {static: true}) tabsTitle: ElementRef;

  tabs = input<Tab[]>();

  tabWidth = input<number>();

  bordered = input<boolean>();

  badgesVisibilityArray = input<boolean[]>([true, true]);

  selectedTabIndex = output<number>();

  public selectedtab = 0;
  public _tabWidth = 0;

  constructor() { }

  ngAfterViewInit(): void {
    this._tabWidth = this.getTabWidth(this.tabsRef, this.tabs().length);
    this.tabCoverRef.nativeElement.style.width = `${this._tabWidth}px`;

    if(this.tabWidth()) {
      this.tabsTitle.nativeElement.style.margin = "0 auto";
    }

    this.updateTabCoverPosition(this.selectedtab);

    const tabs = this.tabsRef.nativeElement.querySelectorAll('.tabs__tab');

    tabs.forEach(tab => {
      tab.style.width = `${this._tabWidth}px`;
    });
  }

  ngOnInit(): void {
  }

  public onTabSelect(index: number): void {
    this.selectedtab = index;
    this.updateTabCoverPosition(index);
    this.selectedTabIndex.emit(index);
  }

  private getTabWidth(tabsRef: ElementRef, tabsCount: number): number {
    return this.tabWidth() || (tabsRef.nativeElement.clientWidth - ((tabsCount - 1) * 4)) / tabsCount;
  }

  private updateTabCoverPosition(offset: number): void {
    this.tabCoverRef.nativeElement.style.left = `${this._tabWidth * offset + (offset * 4)}px`;
  }
}
