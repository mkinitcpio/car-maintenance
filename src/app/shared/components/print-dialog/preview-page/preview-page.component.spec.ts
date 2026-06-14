import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PreviewPageComponent } from './preview-page.component';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('PreviewPageComponent', () => {
  let component: PreviewPageComponent;
  let fixture: ComponentFixture<PreviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewPageComponent],
      providers: [provideMockSettingsService()],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(PreviewPageComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewPageComponent);
    component = fixture.componentInstance;
    component.config = {
      showTablesCostResult: true,
      columns: [
        { id: 'name', visible: true } as any,
        { id: 'cost', visible: false } as any,
      ],
    };
    component.data = {
      tablesData: [{ title: 'T', totalCost: 0, records: [{ cost: '10' }, { cost: '20' }, { cost: '' }] as any }],
    } as any;
  });

  it('sums the record costs on init', () => {
    fixture.detectChanges();
    expect(component.cost).toBe(30);
  });

  it('lists only the visible columns', () => {
    expect(component.displayedColumns).toEqual(['name']);
  });

  it('tracks columns by id', () => {
    expect(component.trackById({ id: 'cost' } as any)).toBe('cost');
  });
});
