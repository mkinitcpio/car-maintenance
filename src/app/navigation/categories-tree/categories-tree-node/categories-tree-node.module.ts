import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesTreeNodeComponent } from './categories-tree-node.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [CategoriesTreeNodeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [
    CategoriesTreeNodeComponent,
  ]
})
export class CategoriesTreeNodeModule { }
