import { FormModeEnum } from '../create-dialog/form-mode.enum';
import { CarCategoryFormData } from '@core/interfaces/car-category';

export interface Data {
  mode: FormModeEnum,
  formData: CarCategoryFormData,
}