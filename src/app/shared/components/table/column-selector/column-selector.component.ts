import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ColumnSchema } from '../interfaces';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';


import { ColumnVisibilityEvent } from './interfaces';
import { CmCheckbox } from '@shared/components/checkbox/checkbox';
import { CmTextHeader } from "@shared/components/typography/text-header/text-header";
import { CmButton } from "@shared/components/button/button";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cm-column-selector',
    templateUrl: './column-selector.component.html',
    styleUrls: ['./column-selector.component.scss'],
    imports: [
    MatMenuModule,
    MatIconModule,
    TranslateModule,
    CmCheckbox,
    CmTextHeader,
    CmButton,
]
})
export class ColumnSelectorComponent {

  columnConfigs = input<ColumnSchema[]>();

  public columns = computed<ColumnSchema[]>(() => this.getColumnsWithoutIgnoredColumns(this.columnConfigs() ?? []));

  onVisibilityChanged = output<ColumnVisibilityEvent>();

  onSwitchState($event:any, key: string) {
    $event.stopPropagation();
    // $event.preventDefault();

    const visible = !this.columns().find(column => column.key === key).visible;
    const event: ColumnVisibilityEvent = {
      key,
      visible,
    };

    this.onVisibilityChanged.emit(event);
  }

  private getColumnsWithoutIgnoredColumns(columnConfigs: ColumnSchema[]): ColumnSchema[] {
    return columnConfigs.filter(config => !['position', 'name'].includes(config.key));
  }
}
