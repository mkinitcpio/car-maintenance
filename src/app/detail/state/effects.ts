import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataBaseService } from '../../core/database';
import * as DetailsActions  from './actions';

@Injectable()
export class DetailsEffects {
  getRecords$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.getRecords),
      switchMap(({ id }) => {
        const data = this.database.getRecords(id);

        return of(DetailsActions.getRecordsSuccess({ records: data }));
      }),
    );
  });

  newRecord$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.createRecord),
      switchMap(({ record }) => {
        this.database.saveNewRecord(record);
        return of(DetailsActions.createRecordsSuccess());
      }),
    );
  });

  deleteRecord$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.deleteRecord),
      switchMap(({ id }) => {
        this.database.deleteRecord(id);
        return of( DetailsActions.deleteRecordSuccess({ id }));
      }),
    );
  });

  editRecord$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.editRecord),
      switchMap(({ record }) => {
        this.database.editRecord(record);
        return of(DetailsActions.editRecordSuccess());
      }),
    );
  });

  moveRecords$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.moveRecords),
      switchMap(({ parentId, recordIds }) => this.database.moveRecords(parentId, recordIds)),
      switchMap(() => of(DetailsActions.moveRecordsSuccess())),
    );
  });

  constructor(
    private actions$: Actions,
    private database: DataBaseService,
  ) { }
}