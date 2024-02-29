import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataBaseService } from '../../core/database';
import * as CategoryDetailsActions  from './actions';

@Injectable({providedIn: "root"})
export class CategoryDetailsEffects {
  getCategoryDetails$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryDetailsActions.getCategoryDetails),
      switchMap(({ id }) => {
        return of(this.database.getCategoryDetails(id)).pipe(
          switchMap((categoryDetails) => {
            return of(CategoryDetailsActions.getCategoryDetailsSuccess({ categoryDetails }));
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private database: DataBaseService,
  ) { }
}
