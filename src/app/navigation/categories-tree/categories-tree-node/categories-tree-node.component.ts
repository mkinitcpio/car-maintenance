import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { SettingsService } from '../../../shared/components/settings/settings.service';
import { Category, CategoryTree } from '../../state/interface';
import { GroupTreeService } from '../group-tree.service';

@Component({
  selector: 'app-categories-tree-node',
  templateUrl: './categories-tree-node.component.html',
  styleUrls: ['./categories-tree-node.component.scss']
})
export class CategoriesTreeNodeComponent {

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  @Input()
  child: CategoryTree;

  @Input()
  isSubGroup: boolean;

  @Output()
  add: EventEmitter<Category> = new EventEmitter();

  @Output()
  edit: EventEmitter<Category> = new EventEmitter();

  @Output()
  delete: EventEmitter<Category> = new EventEmitter();

  @Output()
  select: EventEmitter<Category> = new EventEmitter();

  public expand = false;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(
    public settingsService: SettingsService,
    public groupTreeService: GroupTreeService,
  ) {}

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = `${event.clientX}px`;
    this.contextMenuPosition.y = `${event.clientY}px`;
    this.contextMenu.openMenu();
  }

  public onAdd(): void {
    this.add.emit(this.child as Category);
  }

  public onEdit(category?: Category): void {
    this.edit.emit(category || this.child as Category);
  }

  public onDelete(category?: Category): void {
    this.delete.emit(category || this.child as Category);
  }

  public onSelect(category: CategoryTree): void {
    const {id, parent, name} = category;

    if(category.parent) {
      this.groupTreeService.selectedItem({
        routeName: 'details',
        group: { id, parent, name },
      });
    } else {
      this.groupTreeService.selectedItem({
        routeName: 'category-details',
        group: { id },
      });
    }
  }

  public get isSelected(): boolean {
    return this.groupTreeService.getSelectedItem()?.group.id === this.child.id;
  }

  public switchExpandState(): void {
    this.groupTreeService.switchExpandState(this.child.id);
  }

  public get expanded(): boolean {
    return this.groupTreeService.getGroupExpandState(this.child.id);
  }
}
