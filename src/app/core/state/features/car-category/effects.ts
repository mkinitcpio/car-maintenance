import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Category } from 'app/navigation/state/interface';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataBaseService } from '../../../database';
import * as CarCategoryActions  from './actions';
import { CategoryTypeEnum } from './enums';

import { v4 as uuidv4 } from 'uuid';
import { Maintenance } from '@core/interfaces/maintenance';
import { ProjectStatusEnum } from '@core/state/features/maintenance/enums';

@Injectable({
  providedIn: 'root',
})
export class CarCategoryEffects {
  createCarCategory$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarCategoryActions.createCarCategory),
      switchMap(({ carCategoryFormData }) => {
        const { parts, ...carCategoryData } = carCategoryFormData;
        carCategoryData.type = CategoryTypeEnum.Car;
        const carSubCategories: Category[] = parts.map(partName => ({
          id: uuidv4(),
          name: partName,
          illustration: null,
          parent: carCategoryData.id,
          type: CategoryTypeEnum.Category,
        }));

        const maintenance: Maintenance = {
          parent: carCategoryData.id,
          note: "",
          completedParts: [],
          status: ProjectStatusEnum.Init,
        };

        return this.database.saveNewCarCategory(carCategoryData, carSubCategories, maintenance);
      }),
      switchMap((carCategory) => of(CarCategoryActions.createCarCategorySuccess({ carCategory }))),
    );
  });

  getCarCategory$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarCategoryActions.getCarCategory),
      switchMap(({ id }) => this.database.getCarCategory(id)),
      switchMap((carCategory) => of(CarCategoryActions.getCarCategorySuccess({ carCategory }))),
    );
  });

  deleteCarCategory$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarCategoryActions.deleteCarCategory),
      switchMap(({ id }) => this.database.deleteCarCategory(id)),
      switchMap((carCategory) => of(CarCategoryActions.deleteCarCategorySuccess({ carCategory }))),
    );
  });

  editCarCategory$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarCategoryActions.editCarCategory),
      switchMap(({ carCategoryFormData }) => {
        const { parts, ...carCategory } = carCategoryFormData;
        return this.database.editCarCategory(carCategory);
      }),
      switchMap((carCategory) => of(CarCategoryActions.editCarCategorySuccess({ carCategory }))),
    );
  });

  constructor(
    private actions$: Actions,
    private database: DataBaseService,
  ) { }
}
