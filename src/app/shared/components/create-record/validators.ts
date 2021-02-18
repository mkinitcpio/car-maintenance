import { AbstractControl } from "@angular/forms";

export function numberValidator(control: AbstractControl): {[key: string]: any} | null {
  const value = control.value;
  let error = null;

  if (Number.isNaN(+value)) {
    error = {
      number: {
        value: 'Введите числовое значение.',
      }
    };
  }

  return error;
}

export function positiveNumberValidator(control: AbstractControl): {[key: string]: any} | null {
  const value = control.value;
  let error = null;

  if(numberValidator(control)) return error;

  if (value < 0) {
    error = {
      positiveNumber: {
        value: 'Введите неотрицательное число.',
      }
    };
  }

  return error;
}