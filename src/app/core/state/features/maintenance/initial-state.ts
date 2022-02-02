import { Status } from "../../core/state.interfaces";
import { MaintenanceFeatureState } from "./feature.interface";

export const initialState: MaintenanceFeatureState = {
  maintenance: {
    value: null,
    error: null,
    status: Status.Init,
  },
};