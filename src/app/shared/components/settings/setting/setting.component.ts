import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CmTextBody } from "@shared/components/typography/text-body/text-body";

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
    imports: [
    MatIcon,
    CmTextBody,
]
})
export class SettingComponent {
  public label = input<string>();
  public icon = input<string>('');
  public customIcon = input<string>();
}
