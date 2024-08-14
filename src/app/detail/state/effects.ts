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
        const records = this.database.getRecords(id).map((record) => {
          record = {
            ...record,
            labels: record.labels || [],
          };

          return record;
        });

        return of(DetailsActions.getRecordsSuccess({ records }));
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
      switchMap(({ ids }) => {
        this.database.deleteRecord(ids);
        return of( DetailsActions.deleteRecordSuccess({ ids }));
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