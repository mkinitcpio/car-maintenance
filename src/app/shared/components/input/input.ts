import { ChangeDetectionStrategy, Component, ElementRef, computed, forwardRef, input, linkedSignal, output, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CmTextBody } from '../typography/text-body/text-body';

let nextUniqueId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cm-input',
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
  standalone: true,
  imports: [
    CmTextBody,
    MatIconModule,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CmInput),
    multi: true
  }]
})
export class CmInput implements ControlValueAccessor {

  readonly uid = `cm-input-${nextUniqueId++}`;

  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly hint = input<string>('');
  readonly type = input<'text' | 'password'>('text');
  readonly maxlength = input<number>();
  readonly invalid = input<boolean>(false);

  readonly value = input<string>('');
  readonly valueState = linkedSignal<string>(() => this.value());

  readonly disabled = input<boolean>(false);
  readonly disabledState = linkedSignal<boolean>(() => this.disabled());

  readonly focused = signal<boolean>(false);
  readonly passwordVisible = signal<boolean>(false);

  readonly inputType = computed<string>(() => this.type() === 'password' && !this.passwordVisible() ? 'password' : 'text');

  readonly change = output<string>();
  readonly blur = output<void>();

  private readonly fieldInput = viewChild.required<ElementRef<HTMLInputElement>>('fieldInput');

  public focus(): void {
    this.fieldInput().nativeElement.focus();
  }

  onChange: (_: any) => void = () => {};

  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.valueState.update(() => value ?? '');
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabledState.update(() => disabled);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.valueState.update(() => value);
    this.onChange(value);
    this.change.emit(value);
  }

  onFocus(): void {
    this.focused.update(() => true);
  }

  onBlur(): void {
    this.focused.update(() => false);
    this.onTouched();
    this.blur.emit();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update((visible) => !visible);
  }
}
