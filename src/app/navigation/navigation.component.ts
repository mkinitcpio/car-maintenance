import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";

import { MatMenuTrigger } from "@angular/material/menu";

import { FormModeEnum } from "../shared/components/create-dialog/form-mode.enum";
import { NavigationFacade } from "./state/navigation.facade";
import { Category } from "./state/interface";

import { Router } from "@angular/router";
import {SubscriptionListener} from "../core/subscription-listener";
import { DialogManagerService } from "../shared/services/dialog-manager.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent extends SubscriptionListener implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  public treeControl = new NestedTreeControl<any>((node) => node.children);
  public dataSource = new MatTreeNestedDataSource<any>();
  public context: Category;
  public selectedCategory: Category;

  constructor(
    private router: Router,
    private navigationFacade: NavigationFacade,
    private dialogManagerService: DialogManagerService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.listenLoadedEntity$<Category>(this.navigationFacade.deleteCategory$)
      .subscribe(([_, curr]) => {
        const deletedCategory = curr.value;

        if(deletedCategory.id === this.selectedCategory?.id || deletedCategory.id === this.selectedCategory?.parent) {
          this.selectedCategory = null;
          this.router.navigate(['']);
        }
      });

    this.listenLoadedEntity$([
      this.navigationFacade.newCategory$,
      this.navigationFacade.editCategory$,
      this.navigationFacade.deleteCategory$
    ]).subscribe(() => {
      this.navigationFacade.loadCategories();
    });

    this.listenLoadedEntity$<any>(this.navigationFacade.categories$)
      .subscribe(([_, categories]) => {
        this.dataSource.data = [];
        this.dataSource.data = categories.value;
      });

    this.navigationFacade.loadCategories();
  }

  public hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  public isRootCategory(category: Category): boolean {
    return this.dataSource.data.some(row => row.id === category?.id);
  }

  public addCategory(category?: Category): void {
    this.context = null;
    const parentList = this.flatTreeView(this.dataSource.data);
    const data = {
      mode: FormModeEnum.Create,
      parents: parentList,
      parentId: category?.id,
    };

    this.dialogManagerService
      .openCategoryDialog(data)
      .subscribe((category: Category) => {
        this.navigationFacade.createNewCategory(category);
      });
  }

  private flatTreeView(tree): Array<{ name: string; value: string }> {
    return tree
      .map((value) => ({ name: value.name, value: value.id }))
      .filter(parent => parent.value !== this.context);
  }

  private getFlatTreeView(tree): Array<{ name: string; value: string; id: string, parent: string }> {
    return tree
      .map((value) => [value, ...value.children])
      .flat(2)
      .filter((value) => value)
      .map((value) => {
        const { children, ...data } = value;
        return data;
      });
  }

  public onSelectCategory(node: Category): void {
    this.selectedCategory = node;
    if(node.parent) {
      this.router.navigate(['/details', node.id, node.name]);
    } else {
      this.router.navigate(['/category-details', node.id]);
    }
  }

  public openContextMenu(event: Event): void {
    event.preventDefault();
    this.contextMenu.openMenu();
  }

  public onEdit(): void {
    const formData = this.getFlatTreeView(this.dataSource.data).find(
      (row) => row.id === this.context.id
    );
    const parentList = this.flatTreeView(this.dataSource.data);
    const data = {
      mode: FormModeEnum.Edit,
      parents: parentList,
      formData,
    };

    this.dialogManagerService
      .openCategoryDialog(data)
      .subscribe((category: Category) => {
        this.navigationFacade.editCategory(category);
      });
  }

  public onDelete(): void {
    this.navigationFacade.deleteCategory(this.context);
  }
}
