import { Injectable } from "@angular/core";
import {Store } from "@ngrx/store";

import {
  getCategoryDetails,
} from './selectors';

import * as actions from './actions';
import * as MaintenanceActions from '@core/state/features/maintenance/actions';

import { maintenanceSelectors } from '@core/state/features/maintenance/selectors';
import { Maintenance } from "@core/interfaces/maintenance";

@Injectable({
  providedIn: "root"
})
export class CategoryDetailsFacade {

  public readonly categoryDetails$ = this.store.select(getCategoryDetails);
  public readonly updatedMaintenance$ = this.store.select(maintenanceSelectors.getUpdatedMaintenance);

  constructor(private store: Store<any>) {}

  public loadCategoryDetails(id: string): void {
    this.store.dispatch(actions.getCategoryDetails({ id }));
  }

  public updateMaintenance(maintenance: Maintenance): void {
    this.store.dispatch(MaintenanceActions.updateMaintenance({ maintenance }));
  }
}