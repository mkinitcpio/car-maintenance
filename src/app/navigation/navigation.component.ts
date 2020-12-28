import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { CreateDialogComponent } from "./create-dialog/create-dialog.component";

import { filter, pairwise } from "rxjs/operators";
import { MatMenuTrigger } from "@angular/material/menu";

import { FormModeEnum } from "./create-dialog/form-mode.enum";
import { NavigationFacade } from "./state/navigation.facade";
import { Category } from "./state/interface";
import { Status } from "../state/interface";

import { AutoCloseable } from '../core/auto-closeable';
import { merge } from "rxjs";
import { DetailsFacade } from "../detail/state/details.facade";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent extends AutoCloseable implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  treeControl = new NestedTreeControl<any>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  public context;

  constructor(
    public dialog: MatDialog,
    private navigationFacade: NavigationFacade,
    private detailsFacade: DetailsFacade,
  ) {
    super();
  }

  ngOnInit(): void {

    merge(
      this.navigationFacade.newCategory$,
      this.navigationFacade.editCategory$,
      this.navigationFacade.deleteCategory$
    ).pipe(
      pairwise(),
      filter(([prev, curr]) => prev.status === Status.Loading && curr.status === Status.Success)
    ).subscribe(() => {
      this.navigationFacade.loadCategories();
    });

    this.navigationFacade.navigation$
        .pipe(
          pairwise(),
          filter(([prev, curr]) => prev.status === Status.Loading && curr.status === Status.Success)
        ).subscribe(([_, categories]) => {
          this.dataSource.data = [];
          this.dataSource.data = categories.value;
        });

    this.navigationFacade.loadCategories();
  }

  hasChild = (_: number, node: any) => !!node.children;

  public addCategory(): void {
    const parentList = this.flatTreeView(this.dataSource.data);
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: "380px",
      panelClass: "custom-dialog",
      data: {
        mode: FormModeEnum.Create,
        parents: parentList,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((category: Category) => {
        this.navigationFacade.createNewCategory(category);
      });
  }

  private flatTreeView(tree): Array<{ name: string; value: number }> {
    return tree.map((value) => ({ name: value.name, value: value.id }));
  }

  private getFlatTreeView(
    tree
  ): Array<{ name: string; value: number; id: number }> {
    return tree
      .map((value) => [value, ...value.children])
      .flat(2)
      .filter((value) => value)
      .map((value) => {
        const { children, ...data } = value;
        return data;
      });
  }

  public onSelectCategory(id: string): void {
    this.detailsFacade.loadRecords(id);
  }

  public openContextMenu(event): void {
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
