import {
  Component,
  ViewChild,
  input,
  output,
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatRippleModule } from "@angular/material/core";
import { TranslateModule } from "@ngx-translate/core";
import { Category, CategoryTree } from "../../state/interface";
import { GroupTreeService } from "../group-tree.service";
import { CategoryTreeDisplacerComponent } from "../category-tree-displacer/category-tree-displacer.component";
import { CmButton } from "@shared/components/button/button";
import { CmTextBody } from "@shared/components/typography/text-body/text-body";
import { CmLineClamp } from "@shared/directives/line-clamp/line-clamp";

@Component({
  selector: "app-categories-tree-node",
  templateUrl: "./categories-tree-node.component.html",
  styleUrls: ["./categories-tree-node.component.scss"],
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    TranslateModule,
    CmButton,
    CmTextBody,
    CmLineClamp,
    CategoryTreeDisplacerComponent,
  ],
})
export class CategoriesTreeNodeComponent {
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  child = input<CategoryTree>();

  add = output<Category>();
  edit = output<Category>();
  delete = output<Category>();

  contextMenuPosition = { x: "0px", y: "0px" };
  contextMenuCategory: CategoryTree = null;

  constructor(public groupTreeService: GroupTreeService) {}

  public onContextMenu(event: MouseEvent, category: CategoryTree): void {
    event.preventDefault();
    this.contextMenuCategory = category;
    this.contextMenuPosition.x = `${event.clientX}px`;
    this.contextMenuPosition.y = `${event.clientY}px`;
    this.contextMenu.openMenu();
  }

  public onAdd(category: Category = this.child() as Category): void {
    this.add.emit(category);
  }

  public onEdit(category?: Category): void {
    this.edit.emit(category || (this.child() as Category));
  }

  public onDelete(category?: Category): void {
    this.delete.emit(category || (this.child() as Category));
  }

  public onSelect(category: CategoryTree): void {
    const { id, parent, name } = category;

    if (category.parent) {
      this.groupTreeService.selectedItem({
        routeName: "details",
        group: { id, parent, name },
      });
    } else {
      this.groupTreeService.selectedItem({
        routeName: "category-details",
        group: { id },
      });
    }
  }

  public isSelected(category: CategoryTree): boolean {
    return this.groupTreeService.getSelectedItem()?.group.id === category.id;
  }

  public switchExpandState(): void {
    this.groupTreeService.switchExpandState(this.child().id);
  }

  public get expanded(): boolean {
    return this.groupTreeService.getGroupExpandState(this.child().id);
  }
}
