import { Component, Input } from '@angular/core';

import { ColumnConfig, PreviewPageConfig } from './preview-page-config';
import { Record } from '../../../../detail/state/interface';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss'],
})
export class PreviewPageComponent {

  @Input()
  config: PreviewPageConfig;

  @Input()
  records: Array<Record>;

  public readonly dateFormat = 'd MMM, y';

  constructor() { }

  public trackById(columnConfig: ColumnConfig): string {
    return columnConfig.id;
  }

  get displayedColumns(): any {
    return this.config.columns.filter((column) => column.visible).map(c => c.id);
  }

}
