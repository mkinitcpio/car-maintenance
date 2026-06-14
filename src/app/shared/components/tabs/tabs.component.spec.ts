import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [TabsComponent] })
      .overrideComponent(TabsComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    // The view-measurement refs are only wired up in ngAfterViewInit against the
    // real template; stub the one the selection logic touches.
    component.tabCoverRef = { nativeElement: { style: {} } } as any;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('updates the selected tab and emits the new index', () => {
    const spy = jasmine.createSpy('selectedTabIndex');
    component.selectedTabIndex.subscribe(spy);

    component.onTabSelect(2);

    expect(component.selectedtab).toBe(2);
    expect(spy).toHaveBeenCalledWith(2);
  });
});
