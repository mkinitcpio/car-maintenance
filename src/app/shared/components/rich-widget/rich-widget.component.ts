import { Component, Input } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

import { DataType, Orientation } from './types';

@Component({
  selector: 'app-rich-widget',
  templateUrl: './rich-widget.component.html',
  styleUrls: ['./rich-widget.component.scss']
})
export class RichWidgetComponent {

  @Input() tooltip: string;
  @Input() title: string;
  @Input() icon: string;
  @Input() value: string;
  @Input() type: DataType;
  @Input() orientation: Orientation = "vertical";

  constructor(public settingsService: SettingsService) { }
}
