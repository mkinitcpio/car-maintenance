import { ChangeDetectionStrategy, Component,
  ElementRef,
  ViewChild,
  input,
  output, } from "@angular/core";
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

export interface HighlightPart {
  text: string;
  matched: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @ViewChild('contextMenuTrigger', { read: ElementRef })
  contextMenuTrigger: ElementRef<HTMLElement>;

  child = input<CategoryTree>();

  searchQuery = input<string>('');

  add = output<Category>();
  edit = output<Category>();
  delete = output<Category>();

  contextMenuPosition = { x: "0px", y: "0px" };
  contextMenuCategory: CategoryTree = null;

  constructor(public groupTreeService: GroupTreeService) {}

  public onContextMenu(event: MouseEvent, category: CategoryTree): void {
    event.preventDefault();
    this.contextMenuCategory = category;

    const trigger = this.contextMenuTrigger?.nativeElement;

    if (trigger) {
      const triggerRect = trigger.getBoundingClientRect();
      const previousLeft = parseFloat(this.contextMenuPosition.x) || 0;
      const previousTop = parseFloat(this.contextMenuPosition.y) || 0;

      const containingBlockLeft = triggerRect.left - previousLeft;
      const containingBlockTop = triggerRect.top - previousTop;

      this.contextMenuPosition = {
        x: `${event.clientX - containingBlockLeft}px`,
        y: `${event.clientY - containingBlockTop}px`,
      };

      trigger.style.left = this.contextMenuPosition.x;
      trigger.style.top = this.contextMenuPosition.y;
    } else {
      this.contextMenuPosition = { x: `${event.clientX}px`, y: `${event.clientY}px` };
    }

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

  public nameParts(name: string): HighlightPart[] {
    const query = this.searchQuery()?.trim().toLowerCase();

    if (!query || !name) {
      return [{ text: name, matched: false }];
    }

    const lowerName = name.toLowerCase();
    const parts: HighlightPart[] = [];
    let cursor = 0;
    let matchIndex = lowerName.indexOf(query);

    while (matchIndex !== -1) {
      if (matchIndex > cursor) {
        parts.push({ text: name.slice(cursor, matchIndex), matched: false });
      }

      parts.push({ text: name.slice(matchIndex, matchIndex + query.length), matched: true });
      cursor = matchIndex + query.length;
      matchIndex = lowerName.indexOf(query, cursor);
    }

    if (cursor < name.length) {
      parts.push({ text: name.slice(cursor), matched: false });
    }

    return parts;
  }
}
