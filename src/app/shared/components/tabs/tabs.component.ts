import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit {

  @ViewChild('tabCoverRef', {static: true}) tabCoverRef: ElementRef;
  @ViewChild('tabsRef', {static: true}) tabsRef: ElementRef;

  @Input()
  tabs: string[];

  public selectedtab = 0;
  public tabWidth = 0;

  constructor() { }

  ngAfterViewInit(): void {
    this.setTabWidth(this.tabsRef, this.tabs.length);
    this.tabCoverRef.nativeElement.style.width = `${this.tabWidth}px`;
    this.updateTabCoverPosition(this.selectedtab);

    const tabs = this.tabsRef.nativeElement.querySelectorAll('.tabs__tab');

    tabs.forEach(tab => {
      tab.style.width = `${this.tabWidth}px`;
    });
  }

  ngOnInit(): void {
  }

  public onTabSelect(index: number): void {
    this.selectedtab = index;
    this.updateTabCoverPosition(index);
  }

  private setTabWidth(tabsRef: ElementRef, tabsCount: number): void {
    this.tabWidth = (tabsRef.nativeElement.clientWidth - ((tabsCount - 1) * 4)) / tabsCount;
  }

  private updateTabCoverPosition(offset: number): void {
    this.tabCoverRef.nativeElement.style.left = `${this.tabWidth * offset + (offset * 4)}px`;
  }
}
