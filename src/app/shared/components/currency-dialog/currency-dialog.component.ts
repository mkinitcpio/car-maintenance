import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OrderTranslatePipe } from '@shared/pipes/order-translation.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyEnum } from '../settings/currency.enum';
import { currencyOptions } from '../settings/currency-options';
import { SettingsService } from '../settings/settings.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-currency-dialog',
    templateUrl: './currency-dialog.component.html',
    styleUrls: ['./currency-dialog.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DialogComponent,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        OrderTranslatePipe,
        TranslateModule,
    ]
})
export class CurrencyDialogComponent {

  public currencyOptions = currencyOptions;

  constructor(
    private settingsService: SettingsService,
    private dialogRef: MatDialogRef<CurrencyDialogComponent>,
  ) { }

  public onSelectCurrency(currency: CurrencyEnum): void {
    this.settingsService.setCurrency(currency);
    this.dialogRef.close();
  }

  public getCurrentCurrency() {
    return this.currencyOptions.find((currencyOption) => currencyOption.value === this.settingsService.settings.units.currency);
  }
}
