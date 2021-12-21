import { Component, Input, OnInit } from '@angular/core';

import { ColumnConfig, PreviewPageConfig } from './preview-page-config';
import { Record } from '../../../../detail/state/interface';
import { SettingsService } from '../../settings/settings.service';
import { DomSanitizer } from '@angular/platform-browser';

import { appImageBase64 } from './app-image.base64';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss'],
})
export class PreviewPageComponent implements OnInit {

  @Input()
  config: PreviewPageConfig;

  @Input()
  title: string;

  @Input()
  records: Array<Record>;

  public cost = 0;

  public readonly appIconBase64 = appImageBase64;

  public readonly dateFormat = 'd MMM, y';

  constructor(
    public settingsService: SettingsService,
    public domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.cost = this.getResultCost(this.records);
  }

  public trackById(columnConfig: ColumnConfig): string {
    return columnConfig.id;
  }

  get displayedColumns(): any {
    return this.config.columns.filter((column) => column.visible).map(c => c.id);
  }

  private getResultCost(records: Record[]): number {
    const costs = records.map((record) => +record.cost).filter(Boolean);

    return costs.reduce((acc, cost) => acc + cost , 0);
  }

}
