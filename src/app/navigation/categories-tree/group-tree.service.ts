import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryTree } from '../state/interface';

type RouteName = 'details' | 'category-details';

export interface GroupData {
  routeName: RouteName;
  group: Partial<CategoryTree>;
}

@Injectable({
  providedIn: 'root'
})
export class GroupTreeService {

  private _selectedGroup: GroupData = null;
  private expandedGroupsMap: Map<string, boolean> = new Map();

  public selected$: BehaviorSubject<GroupData> = new BehaviorSubject(null);

  constructor() {
  }

  public selectedItem(group: GroupData) {
    this._selectedGroup = group;

    this.selected$.next(this._selectedGroup);
  }

  public getSelectedItem(): GroupData {
    return this._selectedGroup;
  }

  public switchExpandState(id: string): void {
    const expandState = !!this.expandedGroupsMap.get(id);
    this.expandedGroupsMap.set(id, !expandState);
  }

  public getGroupExpandState(id: string): boolean {
    return this.expandedGroupsMap.get(id);
  }
}
