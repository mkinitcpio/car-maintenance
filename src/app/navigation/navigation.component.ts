import { Component, OnInit } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";

import { FormModeEnum } from "../shared/components/create-dialog/form-mode.enum";
import { NavigationFacade } from "./state/navigation.facade";
import { Category, CategoryTree } from "./state/interface";

import { Router } from "@angular/router";
import { DialogManagerService } from "../shared/services/dialog-manager.service";

import { listen } from "../core/decorators";
import { merge } from "rxjs";
import { AutoCloseable } from "../core/auto-closeable";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent extends AutoCloseable implements OnInit {

  @listen({ value: true })
  deleteCategory$ = this.navigationFacade.deleteCategory$;

  @listen({value: true})
  categories$ = this.navigationFacade.categories$;

  @listen()
  categoryChanges$ = merge(
    this.navigationFacade.newCategory$,
    this.navigationFacade.editCategory$,
    this.navigationFacade.deleteCategory$
  );

  public dataSource = new MatTreeNestedDataSource<any>();
  public selectedCategory: Category;
  public categories: CategoryTree[];

  constructor(
    private router: Router,
    private navigationFacade: NavigationFacade,
    private dialogManagerService: DialogManagerService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.deleteCategory$
      .subscribe((deletedCategory) => {
        if(deletedCategory.id === this.selectedCategory?.id || deletedCategory.id === this.selectedCategory?.parent) {
          this.selectedCategory = null;
          this.router.navigate(['']);
        }
      });

    this.categoryChanges$
      .subscribe(() => {
        this.navigationFacade.loadCategories();
      });

    this.categories$
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.navigationFacade.loadCategories();
  }

  public addCategory(category?: Category): void {
    const parentList = this.getListOfParents(this.categories);
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

  private getListOfParents(categories: CategoryTree[]): Array<{ name: string; value: string }> {
    return categories.map((value) => ({ name: value.name, value: value.id }));
  }

  private getFlatTreeView(categories): Array<{ name: string; value: string; id: string, parent: string }> {
    return categories
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

  public onEdit(category: Category): void {
    const formData = this.getFlatTreeView(this.categories).find((row) => row.id === category.id);
    const parentList = this.getListOfParents(this.categories);
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

  public onDelete(category: Category): void {
    this.dialogManagerService.openDeleteCategoryDialog(category.name)
      .subscribe(() => {
        this.navigationFacade.deleteCategory(category);
      });
  }
}
