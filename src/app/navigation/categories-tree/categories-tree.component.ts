import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, CategoryTree } from '../state/interface';

@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.scss']
})
export class CategoriesTreeComponent implements OnInit {

  @Input()
  catagories: CategoryTree[];

  @Output()
  add: EventEmitter<Category> = new EventEmitter();

  @Output()
  edit: EventEmitter<Category> = new EventEmitter();

  @Output()
  delete: EventEmitter<Category> = new EventEmitter();

  @Output()
  select: EventEmitter<Category> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onAdd(category: Category): void {
    this.add.emit(category);
  }

  public onEdit(category: Category): void {
    this.edit.emit(category);
  }

  public onDelete(category: Category): void {
    this.delete.emit(category);
  }

  public trackBy(_: number, category: Category): string {
    return category.id;
  }
}
