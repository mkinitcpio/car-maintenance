import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { CreateDialogComponent } from "./create-dialog/create-dialog.component";

import { filter } from "rxjs/operators";
import { MatMenuTrigger } from "@angular/material/menu";

import { FormModeEnum } from "./create-dialog/form-mode.enum";
import { NavigationFacade } from "./state/navigation.facade";
import { Category, CategoryTree } from "./state/interface";

import { Router } from "@angular/router";
import { DetailsFacade } from "../detail/state/details.facade";
import {SubscriptionListener} from "../core/subscription-listener";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent extends SubscriptionListener implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  public treeControl = new NestedTreeControl<any>((node) => node.children);
  public dataSource = new MatTreeNestedDataSource<any>();
  public context: string;
  public selectedCategory: string;

  constructor(
    public dialog: MatDialog,
    private navigationFacade: NavigationFacade,
    private detailsFacade: DetailsFacade,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.listenLoadedEntity$([
      this.navigationFacade.deleteCategory$,
      this.detailsFacade.deleteDetail$,
    ]).subscribe(([_, curr]) => {
      const parents = this.dataSource.data;
      if(parents.some(parent => parent.id === curr.value)) {
        this.router.navigate(['']);
      }
      if(this.selectedCategory === curr.value) {
        this.selectedCategory = null;
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

  public isRootCategory(id: string): boolean {
    return this.dataSource.data.some(row => row.id === id);
  }

  public addCategory(parentId?: string): void {
    this.context = null;
    const parentList = this.flatTreeView(this.dataSource.data);
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: "380px",
      panelClass: "custom-dialog",
      data: {
        mode: FormModeEnum.Create,
        parents: parentList,
        parentId,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
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

  public onSelectCategory(node: CategoryTree): void {
    this.selectedCategory = node.id;
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
      (row) => row.id === this.context
    );
    const parentList = this.flatTreeView(this.dataSource.data);
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: "380px",
      panelClass: "custom-dialog",
      data: {
        mode: FormModeEnum.Edit,
        parents: parentList,
        formData,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((category: Category) => {
        this.navigationFacade.editCategory(category);
      });
  }

  public onDelete(): void {
    this.navigationFacade.deleteCategory(this.context);
  }
}
