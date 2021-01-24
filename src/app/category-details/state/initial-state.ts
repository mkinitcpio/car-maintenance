import { Status } from "../../state/interface";
import { FeatureState } from "./interface";
import { CategoryDetails } from "./interface";

export const initialState: FeatureState<CategoryDetails> = {
  categoryDetails: {
    value: null,
    error: null,
    status: Status.Init,
  },
};