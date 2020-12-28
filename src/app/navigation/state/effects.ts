import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataBaseService } from '../../core/database';
import * as NavigationActions  from './actions';

import { categoriesMapper } from './mappers';

@Injectable()
export class NavigationEffects {
  getCategories$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(NavigationActions.getCategories),
      switchMap(() => {
        // const data = [
        //   { name: "Двигатель",parent: null, id: '1',},
        //   { name: "один", parent: '1', id: '2',},
        //   { name: "два", parent: '1', id: '3',},
        //   { name: "три", parent: '1', id: '4',},
        //   { name: "Дверь",parent: null, id: '5',},
        //   { name: "Выхлопная труба", parent: null, id: '6',},
        //   { name: "дырка", parent: '6', id: '7'},
        // ];

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
      switchMap(({ id }) => {
        this.database.deleteCategory(id);
        return of( NavigationActions.deleteCategorySuccess());
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