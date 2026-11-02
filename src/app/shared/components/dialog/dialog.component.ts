import { Component, HostListener, OnInit, input, output } from '@angular/core';
import { CmTextHeader } from '../typography/text-header/text-header';
import { CmButton } from '../button/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
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
        MatIconModule,
        TranslateModule,
        CmButton,
        CmTextHeader,
    ]
})
export class DialogComponent implements OnInit {

  title = input<string>();

  mode = input<FormModeEnum>();

  hideFooter = input<boolean>(false);

  closable = input<boolean>(true);

  submitText = input<string>();

  disabledSumbitButton = input<boolean>(false);

  public showNotification = false;

  notification$ = input<Observable<Notification>>();

  loading$ = input<Observable<boolean>>();

  close = output<void>();

  submit = output<void>();

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
    this.notification$()?.pipe(
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
