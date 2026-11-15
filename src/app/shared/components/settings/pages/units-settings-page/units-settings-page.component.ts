import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SettingComponent } from '../../setting/setting.component';
import { SegmentedControlComponent, SegmentedControlOption } from '@shared/components/segmented-control/segmented-control.component';
import { LocaleEnum } from '../../locale-enum';
import { MetricSystemEnum } from '../../metric-system.enum';
import { SettingsService } from '../../settings.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cm-units-settings-page',
    imports: [
        SettingComponent,
        SegmentedControlComponent,
        TranslateModule,
    ],
    templateUrl: './units-settings-page.component.html',
    styleUrl: './units-settings-page.component.scss'
})
export class UnitsSettingsPageComponent {

  region = input<LocaleEnum>();
  metricSystem = input<MetricSystemEnum>();

  private settingsService = inject(SettingsService);

  MetricSystemEnum = MetricSystemEnum;

  public readonly metricSystemOptions: SegmentedControlOption<MetricSystemEnum>[] = [
    { value: MetricSystemEnum.Mi, label: 'METRIC_SYSTEM.MILES' },
    { value: MetricSystemEnum.Km, label: 'METRIC_SYSTEM.KILOMETERS' },
  ];

  public onMetricSystemChanged(mSystem: MetricSystemEnum): void {
    this.settingsService.setMetricSystem(mSystem);
  }
}
