import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MoveDialogComponent } from './move-dialog.component';
import { createMatDialogRefMock, provideDialog } from 'testing/component-setup';

const moveToItems = [
  { id: 'a', name: 'Oil', group: 'Engine', icon: '' },
  { id: 'b', name: 'Air', group: 'Engine', icon: '' },
  { id: 'c', name: 'Pad', group: 'Brakes', icon: '' },
];

describe('MoveDialogComponent', () => {
  let component: MoveDialogComponent;
  let fixture: ComponentFixture<MoveDialogComponent>;
  const dialogRef = createMatDialogRefMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoveDialogComponent],
      providers: provideDialog({ moveToItems, parent: 'x' }, dialogRef),
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(MoveDialogComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(MoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('groups the move targets by their group on init', () => {
    expect(component.items.map((g: any) => g.group)).toEqual(['Engine', 'Brakes']);
    expect(component.items[0].items.length).toBe(2);
  });

  it('filters the targets by the search term', () => {
    component.onSearchChange({ target: { value: 'oil' } });

    expect(component.items.length).toBe(1);
    expect(component.items[0].items.map((i: any) => i.id)).toEqual(['a']);
  });

  it('tracks the selected item and closes with it', () => {
    component.onSelect('b');
    component.onSubmit();

    expect(component.selectedItemId).toBe('b');
    expect(dialogRef.close).toHaveBeenCalledWith('b');
  });
});
