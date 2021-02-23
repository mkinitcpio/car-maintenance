import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormModeEnum } from '../shared/components/create-dialog/form-mode.enum';
import { DetailsFacade } from './state/details.facade';
import { Record } from './state/interface';
import { DialogManagerService } from '../shared/services/dialog-manager.service';
import { listen } from '../core/decorators';
import { merge } from 'rxjs';
import { AutoCloseable } from '../core/auto-closeable';
import { SettingsService } from '../shared/components/settings/settings.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends AutoCloseable implements OnInit {

  @listen({ value: true })
  details$ = this.detailsFacade.details$;

  @listen()
  newDetails$ = this.detailsFacade.newDetails$;

  @listen()
  detailChanges$ = merge(
    this.detailsFacade.editDetail$,
    this.detailsFacade.newDetails$,
    this.detailsFacade.deleteDetail$,
  );

  parentId = null;

  public dataSourceTable: Record[] = [];
  public name: string = null;
  public costSum = 0;
  public lastModifiedDate: Date = null;

  constructor(
    private route: ActivatedRoute,
    private detailsFacade: DetailsFacade,
    public settingsService: SettingsService,
    private dialogManagerService: DialogManagerService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.details$.subscribe((categoryDetails) => {
      this.dataSourceTable = categoryDetails;
      this.costSum = this.getResultCost(this.dataSourceTable);
      this.lastModifiedDate = this.getLastModifiedDate(this.dataSourceTable);
    });

    this.route.params.subscribe((params) => {
      this.parentId = params['id'];
      this.name = params['name'];
      this.detailsFacade.loadRecords(this.parentId);
    });

    this.detailChanges$.subscribe(() => {
      this.detailsFacade.loadRecords(this.parentId);
    });
  }

  public onCreateRecord(): void {
    const data = {
      mode: FormModeEnum.Create,
      parent: this.parentId,
    };

    this.dialogManagerService
      .openRecordDialog(data)
      .subscribe((record: Record) => {
        this.detailsFacade.createNewRecord(record);
      });
  }

  public onEdit(id: string): void {
    const data = {
      mode: FormModeEnum.Edit,
      parent: this.parentId,
      formData: this.dataSourceTable.find(row => row.id === id),
    };

    this.dialogManagerService
      .openRecordDialog(data)
      .subscribe((record: Record) => {
        this.detailsFacade.editRecord(record);
      });
  }

  public onDelete(record: Record): void {
    this.dialogManagerService
      .openDeleteRecordDialog(record.name)
      .subscribe(() => {
        this.detailsFacade.deleteRecord(record.id);
      });
  }

  private getResultCost(records: Record[]): number {
    const costs = records.map((record) => +record.cost).filter(Boolean);

    return costs.reduce((acc, cost) => acc + cost , 0);
  }

  private getLastModifiedDate(records: Record[]): Date {
    const EMPTY = null;
    const allDates = records.filter((row) => row.date).map((row) => new Date(row.date));
    const lastModifiedDate = allDates.length ? new Date(Math.max.apply(null, allDates)) : EMPTY;

    return lastModifiedDate;
  }
}
