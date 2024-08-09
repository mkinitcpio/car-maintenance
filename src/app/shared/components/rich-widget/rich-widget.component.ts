import { Component, Input } from '@angular/core';
import { MetricSystemEnum } from '../settings/metric-system.enum';
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
  @Input() value: number;
  @Input() transparent: boolean = false;
  @Input() type: DataType;
  @Input() orientation: Orientation = "vertical";

  public MetricSystemEnum = MetricSystemEnum;

  constructor(public settingsService: SettingsService) { }
}
