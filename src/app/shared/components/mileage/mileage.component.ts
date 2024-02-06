import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsService } from '@shared/components/settings/settings.service';

@Component({
  selector: 'cm-mileage',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './mileage.component.html',
  styleUrls: ['./mileage.component.scss']
})
export class MileageComponent {
  public settingsService: SettingsService = inject(SettingsService);
}
