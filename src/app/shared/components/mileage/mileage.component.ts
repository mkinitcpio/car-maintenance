import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsService } from '@shared/components/settings/settings.service';
import { CmTextBody } from '../typography/text-body/text-body';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cm-mileage',
    imports: [
        CommonModule,
        TranslateModule,
        CmTextBody
    ],
    templateUrl: './mileage.component.html',
    styleUrls: ['./mileage.component.scss']
})
export class MileageComponent {
  public settingsService: SettingsService = inject(SettingsService);
}
