import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CellMileageComponent } from './cell-mileage.component';
import { commonComponentProviders } from 'testing/component-setup';

describe('CellMileageComponent', () => {
  let component: CellMileageComponent;
  let fixture: ComponentFixture<CellMileageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellMileageComponent, TranslateModule.forRoot()],
      providers: commonComponentProviders(),
    }).compileComponents();

    fixture = TestBed.createComponent(CellMileageComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the separated mileage value with the unit label', () => {
    component.value = 120000;
    fixture.detectChanges();

    const span: HTMLElement = fixture.nativeElement.querySelector('.cell-mileage');
    expect(span.getAttribute('data-csv')).toContain('120');
    expect(span.querySelector('cm-mileage')).not.toBeNull();
  });
});
