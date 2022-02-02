import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataBaseService } from '../../../database';
import * as MaintenanceActions  from './actions';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceEffects {

  deleteCarCategory$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(MaintenanceActions.updateMaintenance),
      switchMap(({ maintenance }) => this.database.updateMaintenance(maintenance)),
      switchMap((maintenance) => of(MaintenanceActions.updateMaintenanceSuccess({ maintenance }))),
    );
  });

  constructor(
    private actions$: Actions,
    private database: DataBaseService,
  ) { }
}
