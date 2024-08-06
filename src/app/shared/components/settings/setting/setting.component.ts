import { Component, input } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  public label = input<string>();
  public icon = input<string>('');
  public customIcon = input<string>();
}
