import { Status } from "../../core/state.interfaces";
import { CarFeatureState } from "./feature.interface";

export const initialState: CarFeatureState = {
  new: {
    value: null,
    error: null,
    status: Status.Init,
  },
  edit: {
    value: null,
    error: null,
    status: Status.Init,
  },
  delete: {
    value: null,
    error: null,
    status: Status.Init,
  },
  carCategory: {
    value: null,
    error: null,
    status: Status.Init,
  }
};