import { Component, Input, OnInit } from '@angular/core';
import { CurrencyComponent } from '../../../currency/currency.component';
import { NumberSeparatorPipe } from '../../../pipes/number-separator.pipe';
import { LocalizedDatePipe } from '../../../pipes/localized-date.pipe';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { ColumnConfig, PreviewPageConfig } from './preview-page-config';
import { SettingsService } from '../../settings/settings.service';
import { DomSanitizer } from '@angular/platform-browser';

import { appImageBase64 } from './app-image.base64';
import { PrintDialogConfig } from '../print-dialog-config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-preview-page',
    templateUrl: './preview-page.component.html',
    styleUrls: ['./preview-page.component.scss'],
    imports: [
        CommonModule,
        MatTableModule,
        LocalizedDatePipe,
        NumberSeparatorPipe,
        CurrencyComponent,
        TranslateModule,
    ]
})
export class PreviewPageComponent implements OnInit {

  @Input()
  config: PreviewPageConfig;

  @Input()
  data: PrintDialogConfig;

  public cost = 0;
  public isMultiply: boolean;

  public readonly appIconBase64 = appImageBase64;
  public readonly dateFormat = 'd MMM, y';

  constructor(
    public settingsService: SettingsService,
    public domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const costs = this.data.tablesData
      .map(table => table.records)
      .flat(1)
      .map(record => +record.cost)
      .filter(Boolean);

    this.cost = this.getResultCost(costs);
  }

  public trackById(columnConfig: ColumnConfig): string {
    return columnConfig.id;
  }

  get displayedColumns(): any {
    return this.config.columns.filter((column) => column.visible).map(c => c.id);
  }

  private getResultCost(costs: number[]): number {
    return costs.reduce((acc, cost) => acc + cost , 0);
  }

}
