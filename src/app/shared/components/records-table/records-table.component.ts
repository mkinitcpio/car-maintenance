import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Record } from '../../../detail/state/interface';
import { SettingsService } from '../settings/settings.service';

import { currencies } from './currencies';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.scss']
})
export class RecordsTableComponent {

  @Input()
  data: Record[];

  @Input()
  stretch = false;

  @Output()
  edit: EventEmitter<string> = new EventEmitter();

  @Output()
  delete: EventEmitter<Record> = new EventEmitter();

  public context: Record;
  public displayedColumns: string[] = ['position', 'name', 'mileage', 'date', 'cost', 'notes', 'menu'];

  public currencies = currencies;

  public separator = ' ';
  public dateFormat = 'd MMM, y';

  constructor(public settingsService: SettingsService) { }

  public onEdit(): void {
    this.edit.emit(this.context.id);
  }

  public onDelete(): void {
    this.delete.emit(this.context);
  }
}
