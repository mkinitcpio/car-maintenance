import { Component, computed, inject, input, signal } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@shared/components/button/button.module';
import { SettingComponent } from '../../setting/setting.component';
import { SettingsService } from '../../settings.service';
import { CurrencyEnum } from '../../currency.enum';
import { CommonPipesModule } from '@shared/pipes/common-pipes.module';

@Component({
    selector: 'cm-currency-settings-page',
    imports: [
        SettingComponent,
        TranslateModule,
        ButtonModule,
        MatIcon,
        MatSelect,
        MatFormField,
        MatOption,
        MatSelectTrigger,
        CommonPipesModule,
    ],
    templateUrl: './currency-settings-page.component.html',
    styleUrl: './currency-settings-page.component.scss'
})
export class CurrencySettingsPageComponent {
  public settingsService = inject(SettingsService);

  currencyOptions = input<{
    name: string;
    icon: string;
    value: CurrencyEnum;
  }[]>();

  private currency$$ = signal<CurrencyEnum>(this.settingsService.settings.units.currency);

  public currentCurrency$$ = computed(() => {
    return this.currencyOptions().find((currencyOption) => currencyOption.value === this.currency$$());
  })

  public onSelectCurrency(currency: CurrencyEnum): void {
    this.settingsService.setCurrency(currency);
    this.currency$$.set(currency);
  }
}
