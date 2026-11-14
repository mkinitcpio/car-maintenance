import { Injectable } from "@angular/core";
import {Store } from "@ngrx/store";

import {
  getDetails,
  getNewDetail,
  getEditDetail,
  getDeleteDetail,
  getMoveRecords,
} from './selectors';

import * as actions from './actions';
import { Record } from "./interface";

@Injectable({
  providedIn: "root"
})
export class DetailsFacade {

  public readonly details$ = this.store.select(getDetails);
  public readonly newDetails$ = this.store.select(getNewDetail);
  public readonly editDetail$ = this.store.select(getEditDetail);
  public readonly deleteDetail$ = this.store.select(getDeleteDetail);
  public readonly moveRecords$ = this.store.select(getMoveRecords);

  constructor(private store: Store<any>) {}

  public loadRecords(id: string): void {
    this.store.dispatch(actions.getRecords({ id }));
  }

  public createNewRecord(record: Record): void {
    this.store.dispatch(actions.createRecord({ record }));
  }

  public deleteRecord(ids: string[]): void {
    this.store.dispatch(actions.deleteRecord({ ids }));
  }

  public editRecord(record: Record): void {
    this.store.dispatch(actions.editRecord( { record }));
  }

  public moveRecords(parentId: string, recordIds: string[]): void {
    this.store.dispatch(actions.moveRecords( { parentId, recordIds }));
  }
}