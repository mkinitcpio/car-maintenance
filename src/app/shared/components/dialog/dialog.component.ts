import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormModeEnum } from '../create-dialog/form-mode.enum';
import { Notification } from '../notification/interfaces';
import { NotificationTypeEnum } from '../notification/notification-type.enum';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  mode: FormModeEnum;

  @Input()
  hideFooter = false;

  @Input()
  closable = true;

  @Input()
  submitText: string;

  @Input()
  disabledSumbitButton = false;

  public showNotification = false;

  @Input()
  notification$: Observable<Notification>;

  @Input()
  loading$: Observable<boolean>;

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  @Output()
  submit: EventEmitter<void> = new EventEmitter();

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.contentScrolled = (event.target as HTMLElement).scrollTop > 12;
  }

  public FormModeEnum = FormModeEnum;
  public NotificationTypeEnum = NotificationTypeEnum;
  public contentScrolled = false;

  ngOnInit(): void {
    this.notification$?.pipe(
      switchMap(() => {
        this.showNotification = true;
        return timer(2500);
      }))
      .subscribe(() => {
        this.showNotification = false;
      });
  }

  public onClose(): void {
    this.close.emit();
  }

  public onSubmit(): void {
    this.submit.emit();
  }
}
