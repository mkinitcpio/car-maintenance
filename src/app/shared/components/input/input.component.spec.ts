import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [InputComponent] }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  describe('ControlValueAccessor', () => {
    it('writeValue stores the value and notifies the change callback', () => {
      const onChange = jasmine.createSpy('onChange');
      component.registerOnChange(onChange);

      component.writeValue('5w-30');

      expect(component.value).toBe('5w-30');
      expect(onChange).toHaveBeenCalledWith('5w-30');
    });

    it('setDisabledState toggles the disabled flag', () => {
      component.setDisabledState!(true);
      expect(component.disabled).toBe(true);
    });
  });

  describe('focus handling', () => {
    it('marks the control touched and focused on click', () => {
      const onTouched = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouched);

      component.onClick();

      expect(onTouched).toHaveBeenCalled();
      expect(component.focused).toBe(true);
    });

    it('clears the focused flag on blur', () => {
      const onTouched = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouched);
      component.focused = true;

      component.onBlur();

      expect(onTouched).toHaveBeenCalled();
      expect(component.focused).toBe(false);
    });
  });
});
