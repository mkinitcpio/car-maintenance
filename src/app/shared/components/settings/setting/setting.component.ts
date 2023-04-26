import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {

  @Input()
  label: string;

  @Input()
  icon = '';

  @Input()
  customIcon: string;
}
