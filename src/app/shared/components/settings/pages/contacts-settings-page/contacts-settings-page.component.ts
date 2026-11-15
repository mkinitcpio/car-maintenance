import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Contact, contacts } from './contacts';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { CmTextBody } from "@shared/components/typography/text-body/text-body";
import { ExternalLinkService } from '@core/services';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cm-contacts-settings-page',
    imports: [
    TranslateModule,
    MatIcon,
    MatRipple,
    CmTextBody,
],
    templateUrl: './contacts-settings-page.component.html',
    styleUrl: './contacts-settings-page.component.scss'
})
export class ContactsSettingsPageComponent {
  public contacts = signal<Contact[]>(contacts);

  private externalLinkService = inject(ExternalLinkService);

  public onOpenContact(contact: Contact): void {
    this.externalLinkService.open(contact.url);
  }
}
