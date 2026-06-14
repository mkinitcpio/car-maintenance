import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellTextComponent } from './cell-text.component';

describe('CellTextComponent', () => {
  let component: CellTextComponent;
  let fixture: ComponentFixture<CellTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CellTextComponent] }).compileComponents();
    fixture = TestBed.createComponent(CellTextComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the value and mirrors it into the data-csv attribute', () => {
    component.value = 'Brake pads';
    fixture.detectChanges();

    const p: HTMLElement = fixture.nativeElement.querySelector('.cell-text');
    expect(p.textContent).toContain('Brake pads');
    expect(p.getAttribute('data-csv')).toBe('Brake pads');
  });
});
