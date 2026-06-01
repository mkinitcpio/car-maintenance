import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
    imports: [
        MatIcon,
    ]
})
export class SettingComponent {
  public label = input<string>();
  public icon = input<string>('');
  public customIcon = input<string>();
}
