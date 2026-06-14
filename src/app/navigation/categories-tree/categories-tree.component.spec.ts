import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTreeComponent } from './categories-tree.component';
import { Category, CategoryTypeEnum } from '../state/interface';

describe('CategoriesTreeComponent', () => {
  let component: CategoriesTreeComponent;
  let fixture: ComponentFixture<CategoriesTreeComponent>;

  const category: Category = { id: 'c1', name: 'Engine', parent: null, type: CategoryTypeEnum.Category };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesTreeComponent],
    })
      .overrideComponent(CategoriesTreeComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(CategoriesTreeComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('re-emits add/edit/delete through its outputs', () => {
    const added: Category[] = [];
    const edited: Category[] = [];
    const deleted: Category[] = [];
    component.add.subscribe((c) => added.push(c));
    component.edit.subscribe((c) => edited.push(c));
    component.delete.subscribe((c) => deleted.push(c));

    component.onAdd(category);
    component.onEdit(category);
    component.onDelete(category);

    expect(added).toEqual([category]);
    expect(edited).toEqual([category]);
    expect(deleted).toEqual([category]);
  });

  it('tracks rows by id', () => {
    expect(component.trackBy(0, category)).toBe('c1');
  });
});
