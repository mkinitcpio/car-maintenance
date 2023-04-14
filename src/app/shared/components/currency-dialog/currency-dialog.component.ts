import { Component } from '@angular/core';
import { CurrencyEnum } from '../settings/currency.enum';
import { currencyOptions } from '../settings/currency-options';
import { SettingsService } from '../settings/settings.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-currency-dialog',
  templateUrl: './currency-dialog.component.html',
  styleUrls: ['./currency-dialog.component.scss']
})
export class CurrencyDialogComponent {

  public currencyOptions = currencyOptions;

  constructor(
    private settingsService: SettingsService,
    private dialogRef: MatDialogRef<CurrencyDialogComponent>,
  ) { }

  public onSelectCurrency(currency: CurrencyEnum): void {
    this.settingsService.setCurrency(currency);
    this.settingsService.saveSettings();
    this.dialogRef.close();
  }

  public getCurrentCurrency() {
    return this.currencyOptions.find((currencyOption) => currencyOption.value === this.settingsService.settings.units.currency);
  }
}
