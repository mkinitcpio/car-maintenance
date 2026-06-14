import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTreeNodeComponent } from './categories-tree-node.component';
import { GroupTreeService } from '../group-tree.service';
import { CategoryTree, CategoryTypeEnum } from '../../state/interface';
import { provideMockSettingsService } from 'testing/test-mocks';

describe('CategoriesTreeNodeComponent', () => {
  let component: CategoriesTreeNodeComponent;
  let fixture: ComponentFixture<CategoriesTreeNodeComponent>;
  let groupTreeService: GroupTreeService;

  const child: CategoryTree = { id: 'c1', name: 'Engine', type: CategoryTypeEnum.Category };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesTreeNodeComponent],
      providers: [provideMockSettingsService()],
    })
      .overrideComponent(CategoriesTreeNodeComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(CategoriesTreeNodeComponent);
    component = fixture.componentInstance;
    component.child = child;
    groupTreeService = TestBed.inject(GroupTreeService);
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('emits the current child on add', () => {
    const spy = jasmine.createSpy();
    component.add.subscribe(spy);
    component.onAdd();
    expect(spy).toHaveBeenCalledWith(child as any);
  });

  it('emits the explicit category on edit, falling back to the child', () => {
    const spy = jasmine.createSpy();
    component.edit.subscribe(spy);

    const other = { id: 'other' } as any;
    component.onEdit(other);
    expect(spy).toHaveBeenCalledWith(other);

    component.onEdit();
    expect(spy).toHaveBeenCalledWith(child as any);
  });

  describe('onSelect', () => {
    it('selects a category-details route for a top-level group', () => {
      component.onSelect({ id: 'c1', name: 'Engine', type: CategoryTypeEnum.Category });

      expect(groupTreeService.getSelectedItem()).toEqual({
        routeName: 'category-details',
        group: { id: 'c1' },
      });
    });

    it('selects a details route for a sub-group with a parent', () => {
      component.onSelect({ id: 'c2', parent: 'c1', name: 'Oil', type: CategoryTypeEnum.Category });

      expect(groupTreeService.getSelectedItem()).toEqual({
        routeName: 'details',
        group: { id: 'c2', parent: 'c1', name: 'Oil' },
      });
    });
  });

  it('reports selection state based on the group-tree service', () => {
    expect(component.isSelected).toBe(false);

    groupTreeService.selectedItem({ routeName: 'category-details', group: { id: 'c1' } });
    expect(component.isSelected).toBe(true);
  });

  it('delegates expand toggling to the group-tree service', () => {
    expect(component.expanded).toBeUndefined();

    component.switchExpandState();
    expect(component.expanded).toBe(true);

    component.switchExpandState();
    expect(component.expanded).toBe(false);
  });

  it('opens the context menu at the cursor position', () => {
    const openMenu = jasmine.createSpy('openMenu');
    component.contextMenu = { openMenu } as any;
    const event = { preventDefault: jasmine.createSpy('preventDefault'), clientX: 12, clientY: 34 } as any;

    component.onContextMenu(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.contextMenuPosition).toEqual({ x: '12px', y: '34px' });
    expect(openMenu).toHaveBeenCalled();
  });
});
