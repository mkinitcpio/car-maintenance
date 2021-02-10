import { FormModeEnum } from "../../navigation/create-dialog/form-mode.enum";
import { Record } from "../state/interface";

export interface CreateRecordComponentData {
  parent: string;
  formData: Record;
  mode: FormModeEnum;
}