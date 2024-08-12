import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, RequiredValidator } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cm-input',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  providers: [{ 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements ControlValueAccessor {

  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;
  
  private _value;

  @Input()
  set value(val) { this._value = val; }
  get value() { return this._value; }

  @Input() required: boolean = true;

  focused = false;

  onChanged: any = (value: any) => {};
  onTouched: any = () => {};

  disabled = false;

  writeValue(value: string): void {
    this.value = value;
    this.onChanged(value);
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onClick(): void {
    this.onTouched();
    if(!this.focused) this.input.nativeElement.focus();
    this.focused = true;
  }

  public onBlur(): void {
    this.onTouched();
    this.focused = false;
  }
}
