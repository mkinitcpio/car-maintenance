import { Injectable } from "@angular/core";
import {Store } from "@ngrx/store";

import {
  getCategories,
  getDeleteCategory,
  getNewCategory,
  getEditCategory
} from './selectors';

import * as actions from './actions';
import * as carCategoryActions from "@core/state/features/car-category/actions";

import { Category } from "./interface";
import { CarCategoryFormData } from "@core/interfaces/car-category";
import { carCategoriesSelectors } from "@core/state/features/car-category/selectors";


@Injectable({
  providedIn: "root"
})
export class NavigationFacade {

  public readonly categories$ = this.store.select(getCategories);
  public readonly newCategory$ = this.store.select(getNewCategory);
  public readonly editCategory$ = this.store.select(getEditCategory);
  public readonly deleteCategory$ = this.store.select(getDeleteCategory);

  public readonly newCarCategory$ = this.store.select(carCategoriesSelectors.getNewCarCategory);
  public readonly deleteCarCategory$ = this.store.select(carCategoriesSelectors.getDeleteCarCategory);
  public readonly editCarCategory$ = this.store.select(carCategoriesSelectors.getEditCarCategory);
  public readonly carCategory$ = this.store.select(carCategoriesSelectors.getCarCategory);

  constructor(private store: Store<any>) {}

  public loadCategories(): void {
    this.store.dispatch(actions.getCategories());
  }

  public createNewCategory(category: Category): void {
    this.store.dispatch(actions.createCategory({ category }));
  }

  public deleteCategory(category: Category): void {
    this.store.dispatch(actions.deleteCategory({ category }));
  }

  public deleteCarCategory(id: string): void {
    this.store.dispatch(carCategoryActions.deleteCarCategory({ id }));
  }

  public editCategory(category: Category): void {
    this.store.dispatch(actions.editCategory( { category }));
  }

  public getCarCategory(id: string): void {
    this.store.dispatch(carCategoryActions.getCarCategory( { id }));
  }

  public editCarCategory(carCategoryFormData: CarCategoryFormData): void {
    this.store.dispatch(carCategoryActions.editCarCategory( { carCategoryFormData }));
  }

  public addCarCategory(carCategoryFormData: CarCategoryFormData): void {
    this.store.dispatch(carCategoryActions.createCarCategory( { carCategoryFormData }));
  }
}