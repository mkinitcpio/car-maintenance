import { ChangeDetectionStrategy, Component, forwardRef, input, linkedSignal, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CmTextBody } from '../typography/text-body/text-body';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  value = input<boolean>(false);
  valueState = linkedSignal<boolean>(() => this.value());

  disabled = input<boolean>(false);
  disabledState = linkedSignal<boolean>(() => this.disabled());

  intermideate = input<boolean>();
  withoutLabel = input<boolean>(false);
  change = output<boolean>();


  onChange: (_: any) => void = () => {};

  writeValue(value: boolean): void {
    this.valueState.update(() => value);
  }

  onTouched: () => void;

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.disabledState.update(() => disabled);
  }

  onClick(): void {
    this.valueState.update((value) => !value);
    this.onChange(this.valueState());
    this.change.emit(this.valueState());
  }
}
