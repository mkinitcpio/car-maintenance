import { Component, input, output } from '@angular/core';
import { Category, CategoryTree } from '../state/interface';
import { CategoriesTreeNodeComponent } from './categories-tree-node/categories-tree-node.component';

@Component({
    selector: 'app-categories-tree',
    templateUrl: './categories-tree.component.html',
    styleUrls: ['./categories-tree.component.scss'],
    standalone: true,
    imports: [
        CategoriesTreeNodeComponent,
    ],
})
export class CategoriesTreeComponent {

  catagories = input<CategoryTree[]>();

  add = output<Category>();

  edit = output<Category>();

  delete = output<Category>();

  public onAdd(category: Category): void {
    this.add.emit(category);
  }

  public onEdit(category: Category): void {
    this.edit.emit(category);
  }

  public onDelete(category: Category): void {
    this.delete.emit(category);
  }
}
