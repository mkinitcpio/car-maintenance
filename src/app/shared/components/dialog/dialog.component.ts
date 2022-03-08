import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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

  @Input()
  hideFooter = false;

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  @Output()
  submit: EventEmitter<void> = new EventEmitter();

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.contentScrolled = event.target.scrollTop > 12;
  }

  public FormModeEnum = FormModeEnum;
  public contentScrolled = false;

  public onClose(): void {
    this.close.emit();
  }

  public onSubmit(): void {
    this.submit.emit();
  }
}