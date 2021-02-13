import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataBaseService } from '../../core/database';
import * as NavigationActions  from './actions';

import { categoriesMapper } from './mappers';

@Injectable({
  providedIn: 'root',
})
export class NavigationEffects {
  getCategories$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(NavigationActions.getCategories),
      switchMap(() => {
        const data = this.database.getCategories();
        return of( NavigationActions.getCategoriesSuccess({categories: categoriesMapper(data)}));
      }),
    );
  });

  newCategory$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(NavigationActions.createCategory),
      switchMap(({ category }) => {
        this.database.saveNewCategory(category);
        return of( NavigationActions.createCategorySuccess());
      }),
    );
  });

  deleteCategory$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(NavigationActions.deleteCategory),
      switchMap(({ category }) => {
        this.database.deleteCategory(category.id);
        return of( NavigationActions.deleteCategorySuccess({ category }));
      }),
    );
  });

  editCategory$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(NavigationActions.editCategory),
      switchMap(({ category }) => {
        this.database.editCategory(category);
        return of( NavigationActions.editCategorySuccess());
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private database: DataBaseService,
  ) { }
}
