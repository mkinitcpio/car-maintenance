import { Injectable, signal } from '@angular/core';
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

  private expandedGroupsMap: Map<string, boolean> = new Map();
  private readonly searchActive = signal(false);

  public readonly selectedGroup = signal<GroupData>(null);

  public selected$: BehaviorSubject<GroupData> = new BehaviorSubject(null);

  public readonly isSearchActive = this.searchActive.asReadonly();

  constructor() {
  }

  public selectedItem(group: GroupData) {
    this.selectedGroup.set(group);

    this.selected$.next(group);
  }

  public getSelectedItem(): GroupData {
    return this.selectedGroup();
  }

  public switchExpandState(id: string): void {
    if (this.searchActive()) {
      return;
    }

    const expandState = !!this.expandedGroupsMap.get(id);
    this.expandedGroupsMap.set(id, !expandState);
  }

  public getGroupExpandState(id: string): boolean {
    if (this.searchActive()) {
      return true;
    }

    return this.expandedGroupsMap.get(id);
  }

  public setSearchActive(active: boolean): void {
    this.searchActive.set(active);
  }
}
