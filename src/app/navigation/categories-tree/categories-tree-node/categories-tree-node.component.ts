import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, CategoryTree } from '../../state/interface';

@Component({
  selector: 'app-categories-tree-node',
  templateUrl: './categories-tree-node.component.html',
  styleUrls: ['./categories-tree-node.component.scss']
})
export class CategoriesTreeNodeComponent implements OnInit {

  @Input()
  child: CategoryTree;

  @Input()
  selected: string;

  @Input()
  isSubNode = false;

  @Output()
  add: EventEmitter<Category> = new EventEmitter();

  @Output()
  edit: EventEmitter<Category> = new EventEmitter();

  @Output()
  delete: EventEmitter<Category> = new EventEmitter();

  @Output()
  select: EventEmitter<Category> = new EventEmitter();

  public expand = false;

  constructor() { }

  ngOnInit(): void {
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

  public onSelect(category?: Category): void {
    this.select.emit(category || this.child as Category);
  }
}
