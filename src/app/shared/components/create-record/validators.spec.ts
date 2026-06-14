import { AbstractControl } from '@angular/forms';

import { numberValidator, positiveNumberValidator } from './validators';

const control = (value: any): AbstractControl => ({ value } as AbstractControl);

describe('create-record validators', () => {
  describe('numberValidator', () => {
    it('accepts numeric strings', () => {
      expect(numberValidator(control('123'))).toBeNull();
      expect(numberValidator(control('12.5'))).toBeNull();
      expect(numberValidator(control('0'))).toBeNull();
    });

    it('accepts empty and null values (coerced to 0, not NaN)', () => {
      expect(numberValidator(control(''))).toBeNull();
      expect(numberValidator(control(null))).toBeNull();
    });

    it('rejects non-numeric input with a translation key', () => {
      expect(numberValidator(control('abc'))).toEqual({
        number: { value: 'DIALOG.VALIDATIONS.NUMBER' },
      });
    });
  });

  describe('positiveNumberValidator', () => {
    it('accepts positive numbers and zero', () => {
      expect(positiveNumberValidator(control('10'))).toBeNull();
      expect(positiveNumberValidator(control('0'))).toBeNull();
    });

    it('defers (returns null) when the value is not a number', () => {
      expect(positiveNumberValidator(control('abc'))).toBeNull();
    });

    it('rejects negative numbers with a translation key', () => {
      expect(positiveNumberValidator(control('-5'))).toEqual({
        positiveNumber: { value: 'DIALOG.VALIDATIONS.POSITIVE' },
      });
    });
  });
});
