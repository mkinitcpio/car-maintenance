import { Component, Input, OnInit } from '@angular/core';

import { ColumnConfig, PreviewPageConfig } from './preview-page-config';
import { SettingsService } from '../../settings/settings.service';
import { DomSanitizer } from '@angular/platform-browser';

import { appImageBase64 } from './app-image.base64';
import { PrintDialogConfig } from '../print-dialog-config';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss'],
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
