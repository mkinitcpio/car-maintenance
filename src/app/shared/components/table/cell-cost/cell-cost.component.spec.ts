import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCostComponent } from './cell-cost.component';
import { commonComponentProviders } from 'testing/component-setup';

describe('CellCostComponent', () => {
  let component: CellCostComponent;
  let fixture: ComponentFixture<CellCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellCostComponent],
      providers: commonComponentProviders(),
    }).compileComponents();

    fixture = TestBed.createComponent(CellCostComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('injects the settings service used for currency/locale formatting', () => {
    expect(component.settingsService).toBeTruthy();
  });

  it('passes the cost value down to the currency component', () => {
    component.value = 1234;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-currency')).not.toBeNull();
  });
});
