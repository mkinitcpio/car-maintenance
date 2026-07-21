import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesTreeNodeComponent } from "./categories-tree-node.component";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { TranslateModule } from "@ngx-translate/core";
import { MatRippleModule } from "@angular/material/core";
import { CategoryTreeDisplacerComponent } from "../category-tree-displacer/category-tree-displacer.component";
import { ButtonModule } from "@shared/components/button/button.module";
import { CmButton } from "@shared/components/button/button";
import { CmTextBody } from "@shared/components/typography/text-body/text-body";
import { CmLineClamp } from "@shared/directives/line-clamp/line-clamp";

@NgModule({
  declarations: [CategoriesTreeNodeComponent, CategoryTreeDisplacerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
    MatRippleModule,
    ButtonModule,
    CmButton,
    CmTextBody,
    CmLineClamp,
  ],
  exports: [CategoriesTreeNodeComponent],
})
export class CategoriesTreeNodeModule {}
