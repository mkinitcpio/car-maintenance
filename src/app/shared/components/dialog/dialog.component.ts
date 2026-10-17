import { Component, EventEmitter, HostListener, input, Input, OnInit, output, Output } from '@angular/core';
import { CmTextHeader } from '../typography/text-header/text-header';
import { CmButton } from '../button/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormModeEnum } from '../create-dialog/form-mode.enum';
import { Notification } from '../notification/interfaces';
import { NotificationTypeEnum } from '../notification/notification-type.enum';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    imports: [
        CommonModule,
        ButtonComponent,
        MatIconModule,
        TranslateModule,
        CmButton,
        CmTextHeader,
    ]
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

  sideMenuButton = input<boolean>(false);
  sideButtonClick = output<void>();


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
