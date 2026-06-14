import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellDateComponent } from './cell-date.component';
import { commonComponentProviders } from 'testing/component-setup';

describe('CellDateComponent', () => {
  let component: CellDateComponent;
  let fixture: ComponentFixture<CellDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellDateComponent],
      providers: commonComponentProviders(),
    }).compileComponents();

    fixture = TestBed.createComponent(CellDateComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders a formatted, localized date for the value', () => {
    component.value = new Date('2022-01-15T00:00:00').getTime();
    fixture.detectChanges();

    const cell: HTMLElement = fixture.nativeElement.querySelector('.cell-date');
    expect(cell.textContent.trim().length).toBeGreaterThan(0);
    expect(cell.getAttribute('data-csv')).toContain('2022');
  });
});
