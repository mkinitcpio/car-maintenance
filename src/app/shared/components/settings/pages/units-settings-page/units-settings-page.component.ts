import { Component, inject, input } from '@angular/core';
import { SettingComponent } from '../../setting/setting.component';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { LocaleEnum } from '../../locale-enum';
import { MetricSystemEnum } from '../../metric-system.enum';
import { SettingsService } from '../../settings.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cm-units-settings-page',
    imports: [
        SettingComponent,
        MatButtonToggle,
        MatButtonToggleGroup,
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

  public onMetricSystemChanged(mSystem: MetricSystemEnum): void {
    this.settingsService.setMetricSystem(mSystem);
  }
}
