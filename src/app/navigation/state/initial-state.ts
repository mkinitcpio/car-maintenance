import { CategoryTree } from "./interface";
import { FeatureState, Status } from "../../state/interface";

export const initialState: FeatureState<Array<CategoryTree>> = {
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