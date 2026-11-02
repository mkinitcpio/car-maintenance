import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
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

  tooltip = input<string>();
  title = input<string>();
  icon = input<string>();
  value = input<number>();
  transparent = input<boolean>(false);
  type = input<DataType>();
  orientation = input<Orientation>("vertical");

  public MetricSystemEnum = MetricSystemEnum;

  constructor(public settingsService: SettingsService) { }
}
