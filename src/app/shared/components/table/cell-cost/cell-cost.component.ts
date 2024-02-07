import { Component, Input, inject } from '@angular/core';
import { SettingsService } from '@shared/components/settings/settings.service';
import { CurrencyModule } from '@shared/currency/currency.module';
import { CommonPipesModule } from '@shared/pipes/common-pipes.module';

@Component({
  standalone: true,
  selector: 'cm-cell-cost',
  templateUrl: './cell-cost.component.html',
  styleUrl: './cell-cost.component.scss',
  imports: [
    CurrencyModule,
    CommonPipesModule,
  ],
})
export class CellCostComponent {

  @Input() value: number;

  public settingsService = inject(SettingsService);
}
