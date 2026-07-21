import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CmTextBody } from '../typography/text-body/text-body';

@Component({
  selector: 'cm-checkbox',
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.scss'],
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CmCheckbox),
    multi: true
  }],
  imports: [
    CmTextBody,
  ]
})
export class CmCheckbox implements ControlValueAccessor {

  @Input()
  value: boolean;

  @Input()
  intermideate: boolean;

  @Output()
  change: EventEmitter<boolean> = new EventEmitter();

  @Input()
  set disabled(disabled: boolean) {
    this.isDisabled = disabled;
  };

  onChange: (_: any) => void = () => {};

  public isDisabled: boolean;

  constructor() { }

  writeValue(value: boolean): void {
    this.value = value;
  }

  onTouched: () => void;

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onClick(): void {
    this.value = !this.value;
    this.onChange(this.value);
    this.change.emit(this.value);
  }
}
