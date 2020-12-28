import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { CreateDialogComponent } from "./create-dialog/create-dialog.component";

import { filter } from "rxjs/operators";
import { MatMenuTrigger } from "@angular/material/menu";

import { FormModeEnum } from "./create-dialog/form-mode.enum";

const TREE_DATA = [
  {
    name: "Двигатель",
    parent: null,
    id: 1,
    children: [
      { name: "один", parent: 1, id: 2, children: [] },
      { name: "два", parent: 1, id: 3, children: [] },
      { name: "три", parent: 1, id: 4, children: [] },
    ],
  },
  {
    name: "Дверь",
    parent: null,
    id: 5,
    children: [
      { name: "ручка", parent: 5, id: 6, children: [] },
      { name: "зеркало", parent: 5, id: 7, children: [] },
      { name: "стекло", parent: 5, id: 8, children: [] },
    ],
  },
  {
    name: "Выхлопная труба",
    parent: null,
    id: 9,
    children: [
      { name: "дырка", parent: 9, id: 10, children: [] },
      { name: "дырка 1", parent: 9, id: 11, children: [] },
      { name: "дырка 2", parent: 9, id: 12, children: [] },
    ],
  },
];

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  treeControl = new NestedTreeControl<any>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  public context;
  constructor(public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {}

  hasChild = (_: number, node: any) =>
    !!node.children && node.children.length > 0;

  public addCategory(): void {
    const parentList = this.flatTreeView(this.dataSource.data);
    console.log(parentList);
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
      .subscribe((result: any) => {
        if (result.parent === null) {
          TREE_DATA.push({
            name: result.name,
            id: Math.random(),
            parent: result.parent,
            children: [],
          });
        } else {
          TREE_DATA.forEach((leaf) => {
            if (leaf.id === result.parent) {
              leaf.children.push({
                name: result.name,
                parent: result.parent,
                id: Math.random(),
                children: [],
              });
            }
          });
        }

        this.dataSource.data = [];
        this.dataSource.data = TREE_DATA;
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
      .map((value) => {
        const { children, ...data } = value;
        return data;
      });
  }

  public onSelectCategory(id: number): void {
    console.log(id);
  }

  public openContextMenu(event): void {
    event.preventDefault(); // Suppress the browser's context menu
    this.contextMenu.openMenu(); // Open your custom context menu instead
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
      .subscribe((result: any) => {
        if (result.parent === null) {
          const node = this.dataSource.data.find((row) => row.id === result.id);
          console.log(node);
        } else {
          this.dataSource.data.forEach(element => {
            element.children.forEach(element => {
              if(element.id === result.id) {
                element.name = result.name;
                element.parent = result.parent;
              }
            });
          });
        }

        this.dataSource.data = [];
        this.dataSource.data = TREE_DATA;
      });
  }

  public onDelete(): void {
    console.log(this.context);
  }
}
