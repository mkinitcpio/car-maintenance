import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnSchema } from '../interfaces';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@shared/components/button/button.module';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ColumnVisibilityEvent } from './interfaces';

@Component({
  standalone: true,
  selector: 'cm-column-selector',
  templateUrl: './column-selector.component.html',
  styleUrls: ['./column-selector.component.scss'],
  imports: [
    MatMenuModule,
    MatIconModule,
    ButtonModule,
    TranslateModule,
    CommonModule,
    MatCheckboxModule,
  ],
})
export class ColumnSelectorComponent {

  @Input()
  set columnConfigs(columnConfigs: ColumnSchema[]){
    this.columns = this.getColumnsWithoutIgnoredColumns(columnConfigs);
  }

  public columns: ColumnSchema[];

  @Output() onVisibilityChanged: EventEmitter<ColumnVisibilityEvent> = new EventEmitter();

  onSwitchState($event:any, key: string) {
    $event.stopPropagation();
    $event.preventDefault();

    const visible = !this.columns.find(column => column.key === key).visible;
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
