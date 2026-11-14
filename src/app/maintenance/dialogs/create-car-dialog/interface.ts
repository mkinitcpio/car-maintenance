import { FormModeEnum } from '../../../maintenance/create-dialog/form-mode.enum';
import { CarCategoryFormData } from '@core/interfaces/car-category';

export interface Data {
  mode: FormModeEnum,
  formData: CarCategoryFormData,
}