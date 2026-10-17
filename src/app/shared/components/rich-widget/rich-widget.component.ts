import { Component, Input } from '@angular/core';
import { CmTextBody } from '../typography/text-body/text-body';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumberSeparatorPipe } from '@shared/pipes/number-separator.pipe';
import { LocalizedDatePipe } from '@shared/pipes/localized-date.pipe';
import { CurrencyComponent } from '@shared/currency/currency.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MetricSystemEnum } from '../settings/metric-system.enum';
import { SettingsService } from '../settings/settings.service';

import { DataType, Orientation } from './types';

@Component({
    selector: 'app-rich-widget',
    templateUrl: './rich-widget.component.html',
    styleUrls: ['./rich-widget.component.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        TranslateModule,
        CurrencyComponent,
        LocalizedDatePipe,
        NumberSeparatorPipe,
        MatTooltipModule,
        CmTextBody,
    ]
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
