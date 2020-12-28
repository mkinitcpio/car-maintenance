import { Injectable } from "@angular/core";
import {Store } from "@ngrx/store";

import {
  getCategories,
  getDeleteCategory,
  getNewCategory,
  getEditCategory
} from './selectors';

import * as actions from './actions';
import { Category } from "./interface";

@Injectable({
  providedIn: "root"
})
export class NavigationFacade {

  public readonly navigation$ = this.store.select(getCategories);
  public readonly newCategory$ = this.store.select(getNewCategory);
  public readonly editCategory$ = this.store.select(getEditCategory);
  public readonly deleteCategory$ = this.store.select(getDeleteCategory);

  constructor(private store: Store<any>) {}

  public loadCategories(): void {
    this.store.dispatch(actions.getCategories());
  }

  public createNewCategory(category: Category): void {
    this.store.dispatch(actions.createCategory({ category }));
  }

  public deleteCategory(id: string): void {
    this.store.dispatch(actions.deleteCategory({ id }));
  }

  public editCategory(category: Category): void {
    this.store.dispatch(actions.editCategory( { category }));
  }
}