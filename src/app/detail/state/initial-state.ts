import { Record } from "./interface";
import { FeatureState, Status } from "../../state/interface";

export const initialState: FeatureState<Array<Record>> = {
  entity: {
    value: null,
    error: null,
    status: Status.Init,
  },
  newEntity: {
    value: null,
    error: null,
    status: Status.Init,
  },
  deleteEntity: {
    value: null,
    error: null,
    status: Status.Init,
  },
  editEntity: {
    value: null,
    error: null,
    status: Status.Init,
  }
};