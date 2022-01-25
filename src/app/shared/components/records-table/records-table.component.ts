import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Record } from '../../../detail/state/interface';
import { CurrencySizeEnum } from '../../currency/currency-size.enum';
import { CurrencyEnum } from '../settings/currency.enum';
import { LocaleEnum } from '../settings/locale-enum';
import { MetricSystemEnum } from '../settings/metric-system.enum';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.scss']
})
export class RecordsTableComponent {

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  @Input()
  data: Record[];

  @Input()
  stretch = false;

  @Output()
  edit: EventEmitter<string> = new EventEmitter();

  @Output()
  delete: EventEmitter<Record> = new EventEmitter();

  public context: Record;
  public displayedColumns: string[] = ['position', 'name', 'mileage', 'date', 'cost', 'notes'];

  public CurrencyEnum = CurrencyEnum;
  public LocaleEnum = LocaleEnum;
  public CurrencySizeEnum = CurrencySizeEnum;
  public MetricSystemEnum = MetricSystemEnum;

  public separator = ' ';
  public dateFormat = 'd MMM, y';
  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(public settingsService: SettingsService) { }

  public onEdit(): void {
    this.edit.emit(this.context.id);
  }

  public onDelete(): void {
    this.delete.emit(this.context);
  }

  onContextMenu(event: MouseEvent, row: Record) {
    event.preventDefault();
    this.context = row;
    this.contextMenuPosition.x = `${event.clientX}px`;
    this.contextMenuPosition.y =`${event.clientY}px`;
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
