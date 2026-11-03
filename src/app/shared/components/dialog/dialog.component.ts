import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';
import { CmTextHeader } from '../typography/text-header/text-header';
import { CmButton } from '../button/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormModeEnum } from '../create-dialog/form-mode.enum';
import { NotificationTypeEnum } from '../notification/notification-type.enum';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class DialogComponent {

  title = input<string>();

  mode = input<FormModeEnum>();

  hideFooter = input<boolean>(false);

  closable = input<boolean>(true);

  submitText = input<string>();

  disabledSumbitButton = input<boolean>(false);
  public reduceSpace = input<boolean>(false);

  close = output<void>();

  submit = output<void>();

  sideMenuButton = input<boolean>(false);
  sideButtonClick = output<void>();

  public FormModeEnum = FormModeEnum;
  public NotificationTypeEnum = NotificationTypeEnum;
  public contentScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.contentScrolled = (event.target as HTMLElement).scrollTop > 12;
  }

  public onClose(): void {
    this.close.emit();
  }

  public onSubmit(): void {
    this.submit.emit();
  }
}
