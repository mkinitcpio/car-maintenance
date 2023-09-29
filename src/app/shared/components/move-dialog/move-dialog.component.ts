import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoveDialogData, MoveToItem } from './interfaces';

@Component({
  selector: 'app-move-dialog',
  templateUrl: './move-dialog.component.html',
  styleUrls: ['./move-dialog.component.scss']
})
export class MoveDialogComponent implements OnInit {

  public selectedItemId: string;
  public items = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MoveDialogData,
    public dialogRef: MatDialogRef<MoveDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.items = this.convertToGroup(this.data.moveToItems);
  }

  public onSelect(id: string): void {
    this.selectedItemId = id;
  }

  public onSearchChange(searchValue: string): void {
    const searchedItems = this.data.moveToItems.filter(item => {
      const itemName = item.name.toLowerCase();

      return itemName.includes(searchValue.toLowerCase());
    });

    this.items = this.convertToGroup(searchedItems);
  }

  public onSubmit(): void {
    this.dialogRef.close(this.selectedItemId);
  }

  private convertToGroup(moveToItems: Array<MoveToItem>): Array<{group: string, items: MoveToItem[]}> {
    const itemsByGroup = moveToItems.reduce((acc, cur) => {
      acc[cur.group] = acc[cur.group] || [];
      acc[cur.group].push(cur);

      return acc;
    }, {});

    return Object.entries(itemsByGroup)
      .map(([group, items]: [string, Array<MoveToItem>]) => ({group, items}));
  }
}
