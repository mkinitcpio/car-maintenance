export interface MoveToItem {
  id: string;
  name: string;
  icon?: string;
  group: string;
}

export interface MoveDialogData {
  parent: string,
  moveToItems: Array<MoveToItem>;
}
