import { Component, signal } from '@angular/core';

import { contacts } from './contacts';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { CmTextBody } from "@shared/components/typography/text-body/text-body";

@Component({
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
  public contacts = signal(contacts);
}
