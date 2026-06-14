import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePanelComponent } from './table-panel.component';

describe('TablePanelComponent', () => {
  let component: TablePanelComponent;
  let fixture: ComponentFixture<TablePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TablePanelComponent] })
      .overrideComponent(TablePanelComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(TablePanelComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('exposes sensible input defaults', () => {
    expect(component.selectedRowsCount()).toBe(0);
    expect(component.hasData()).toBe(true);
  });
});
