import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
    let component: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [TabsComponent] })
            .overrideComponent(TabsComponent, { set: { template: '' } })
            .compileComponents();

        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.componentInstance;
    });

    it('creates', () => {
        expect(component).toBeTruthy();
    });

    it('updates the selected tab and emits the new index', () => {
        const spy = vi.fn().mockName('selectedTabIndex');
        component.selectedTabIndex.subscribe(spy);

        component.onTabSelect(2);

        expect(component.selectedtab).toBe(2);
        expect(spy).toHaveBeenCalledWith(2);
    });
});
