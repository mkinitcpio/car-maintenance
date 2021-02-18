import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesTreeComponent } from './categories-tree.component';
import { CategoriesTreeNodeModule } from './categories-tree-node/categories-tree-node.module';

@NgModule({
  declarations: [CategoriesTreeComponent],
  imports: [
    CommonModule,
    CategoriesTreeNodeModule,
  ],
  exports: [
    CategoriesTreeComponent,
  ]
})
export class CategoriesTreeModule { }
