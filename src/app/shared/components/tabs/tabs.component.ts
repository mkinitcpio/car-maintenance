import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit {

  @ViewChild('tabCoverRef', {static: true}) tabCoverRef: ElementRef;
  @ViewChild('tabsRef', {static: true}) tabsRef: ElementRef;
  @ViewChild('tabsTitle', {static: true}) tabsTitle: ElementRef;

  @Input()
  tabs: string[];

  @Input()
  tabWidth: number;

  @Input()
  bordered: boolean;

  @Input()
  badgesVisibilityArray: boolean[] = [true, true];

  @Output()
  selectedTabIndex: EventEmitter<number> = new EventEmitter();

  public selectedtab = 0;
  public _tabWidth = 0;

  constructor() { }

  ngAfterViewInit(): void {
    this._tabWidth = this.getTabWidth(this.tabsRef, this.tabs.length);
    this.tabCoverRef.nativeElement.style.width = `${this._tabWidth}px`;

    if(this.tabWidth) {
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
    return this.tabWidth || (tabsRef.nativeElement.clientWidth - ((tabsCount - 1) * 4)) / tabsCount;
  }

  private updateTabCoverPosition(offset: number): void {
    this.tabCoverRef.nativeElement.style.left = `${this._tabWidth * offset + (offset * 4)}px`;
  }
}
