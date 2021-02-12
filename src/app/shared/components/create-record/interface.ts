import { FormModeEnum } from "../create-dialog/form-mode.enum";
import { Record } from "../../../detail/state/interface";

export interface CreateRecordComponentData {
  parent: string;
  formData: Record;
  mode: FormModeEnum;
}