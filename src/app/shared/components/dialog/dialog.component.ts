import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormModeEnum } from '../create-dialog/form-mode.enum';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  @Input()
  title: string;

  @Input()
  mode: FormModeEnum;

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  @Output()
  submit: EventEmitter<void> = new EventEmitter();

  public FormModeEnum = FormModeEnum;

  public onClose(): void {
    this.close.emit();
  }

  public onSubmit(): void {
    this.submit.emit();
  }
}
