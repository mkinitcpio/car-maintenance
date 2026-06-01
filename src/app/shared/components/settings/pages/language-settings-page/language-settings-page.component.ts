import { Component, inject, input } from '@angular/core';
import { SettingComponent } from '../../setting/setting.component';
import { MatDivider } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsService } from '../../settings.service';
import { LocaleEnum } from '../../locale-enum';
import { SelectOption } from '../../interface';

@Component({
    selector: 'cm-language-settings-page',
    imports: [
        SettingComponent,
        MatDivider,
        MatFormField,
        MatIcon,
        MatSelectModule,
        TranslateModule,
    ],
    templateUrl: './language-settings-page.component.html',
    styleUrl: './language-settings-page.component.scss'
})
export class LanguageSettingsPageComponent {

  public languageOptions = input<SelectOption[]>();
  public regionOptions = input<SelectOption[]>();

  settingsService = inject(SettingsService);

  public onSelectLanguage(language: string): void {
    this.settingsService.setAppLanguage(language);
  }

  public onSelectRegion(region: LocaleEnum): void {
    this.settingsService.setRegion(region);
  }
}
