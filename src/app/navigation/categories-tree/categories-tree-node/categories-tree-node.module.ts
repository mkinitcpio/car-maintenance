import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesTreeNodeComponent } from './categories-tree-node.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MatRippleModule } from '@angular/material/core';
import { CategoryTreeDisplacerComponent } from '../category-tree-displacer/category-tree-displacer.component';

@NgModule({
  declarations: [
    CategoriesTreeNodeComponent,
    CategoryTreeDisplacerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
    MatRippleModule,
  ],
  exports: [
    CategoriesTreeNodeComponent,
  ]
})
export class CategoriesTreeNodeModule { }
