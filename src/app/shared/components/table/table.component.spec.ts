import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { RowData } from './interfaces';
import { defaultTableConfig } from './default-table-config';

describe('TableComponent', () => {
  let component: TableComponent<RowData>;
  let fixture: ComponentFixture<TableComponent<RowData>>;

  const rows: RowData[] = [
    { id: 'r1', name: 'A' },
    { id: 'r2', name: 'B' },
    { id: 'r3', name: 'C' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableComponent] })
      .overrideComponent(TableComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent<RowData>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('config', { ...defaultTableConfig });
    fixture.detectChanges(); // the rows effect clears any selection
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('toggles a single row selection when selectable', () => {
    component.onSelectionChange('r1');
    expect(component.selectedRows.isSelected('r1')).toBe(true);

    component.onSelectionChange('r1');
    expect(component.selectedRows.isSelected('r1')).toBe(false);
  });

  it('selects and clears all rows', () => {
    component.onAllRowToggle(true);
    expect(component.selectedRows.selected.sort()).toEqual(['r1', 'r2', 'r3']);
    expect(component.allRowSelected).toBe(true);

    component.onAllRowToggle(false);
    expect(component.selectedRows.selected).toEqual([]);
    expect(component.allRowSelected).toBe(false);
  });

  it('reports a partial selection through someRowSelected', () => {
    component.onSelectionChange('r1');
    expect(component.someRowSelected).toBe(true);

    component.onAllRowToggle(true);
    expect(component.someRowSelected).toBe(false);
  });

  it('emits the selected ids on delete, or the passed row when nothing is selected', () => {
    const emitted: string[][] = [];
    component.delete.subscribe((ids) => emitted.push(ids));

    component.onDelete({ id: 'rX', name: 'X' });
    expect(emitted[0]).toEqual(['rX']);

    component.onSelectionChange('r1');
    component.onSelectionChange('r2');
    component.onDelete();
    expect(emitted[1].sort()).toEqual(['r1', 'r2']);
  });

  it('emits the id on edit and the selection on move', () => {
    const edited = jasmine.createSpy('edit');
    const moved = jasmine.createSpy('move');
    component.edit.subscribe(edited);
    component.move.subscribe(moved);

    component.onEdit('r2');
    component.onSelectionChange('r3');
    component.onMove();

    expect(edited).toHaveBeenCalledWith('r2');
    expect(moved).toHaveBeenCalledWith(['r3']);
  });

  it('computes the hidden columns when visibility changes', () => {
    fixture.componentRef.setInput('config', {
      ...defaultTableConfig,
      columnSchemas: [
        { key: 'name', name: '', type: '', order: 1, visible: true },
        { key: 'cost', name: '', type: '', order: 2, visible: true },
      ],
    });
    fixture.detectChanges();

    const spy = jasmine.createSpy('columnVisibilityChange');
    component.columnVisibilityChange.subscribe(spy);

    component.onColumnVisibilityChanged({ key: 'cost', visible: false });

    expect(spy).toHaveBeenCalledWith(['cost']);
  });
});
