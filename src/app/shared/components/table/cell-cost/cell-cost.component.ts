import { Component, Input, inject } from '@angular/core';
import { SettingsService } from '@shared/components/settings/settings.service';
import { CurrencyComponent } from '@shared/currency/currency.component';
import { NumberSeparatorPipe } from '@shared/pipes/number-separator.pipe';

@Component({
    selector: 'cm-cell-cost',
    templateUrl: './cell-cost.component.html',
    styleUrl: './cell-cost.component.scss',
    imports: [
        CurrencyComponent,
        NumberSeparatorPipe,
    ]
})
export class CellCostComponent {

  @Input() value: number;

  public settingsService = inject(SettingsService);
}
