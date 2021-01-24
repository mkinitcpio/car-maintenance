import { Injectable } from "@angular/core";
import {Store } from "@ngrx/store";

import {
  getCategoryDetails,
} from './selectors';

import * as actions from './actions';

@Injectable({
  providedIn: "root"
})
export class CategoryDetailsFacade {

  public readonly categoryDetails$ = this.store.select(getCategoryDetails);

  constructor(private store: Store<any>) {}

  public loadCategoryDetails(id: string): void {
    this.store.dispatch(actions.getCategoryDetails({ id }));
  }
}