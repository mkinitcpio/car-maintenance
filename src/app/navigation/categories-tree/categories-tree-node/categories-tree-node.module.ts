import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesTreeNodeComponent } from './categories-tree-node.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CategoriesTreeNodeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
  ],
  exports: [
    CategoriesTreeNodeComponent,
  ]
})
export class CategoriesTreeNodeModule { }
