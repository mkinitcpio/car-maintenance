import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellNoteComponent } from './cell-note.component';
import { commonComponentProviders } from 'testing/component-setup';

describe('CellNoteComponent', () => {
  let component: CellNoteComponent;
  let fixture: ComponentFixture<CellNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellNoteComponent],
      providers: commonComponentProviders(),
    }).compileComponents();

    fixture = TestBed.createComponent(CellNoteComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('hides the note icon when there is no value', () => {
    component.value = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-icon')).toBeNull();
  });

  it('shows a note icon when there is a value', () => {
    component.value = 'Replace soon';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-icon')).not.toBeNull();
  });

  it('exposes the note through the data-csv attribute', () => {
    component.value = 'Replace soon';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.cell-note').getAttribute('data-csv')).toBe(
      'Replace soon',
    );
  });
});
