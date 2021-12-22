import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { merge } from 'rxjs';

import { DetailsFacade } from './state/details.facade';
import { Record } from './state/interface';

import { FormModeEnum } from '@shared/components/create-dialog/form-mode.enum';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { SettingsService } from '@shared/components/settings/settings.service';
import { CurrencyEnum } from '@shared/components/settings/currency.enum';
import { currencies } from '@shared/pipes/currencies';

import { listen } from '@core/decorators';
import { ElectronService } from '@core/services';
import { AutoCloseable } from '@core/auto-closeable';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends AutoCloseable implements OnInit {

  @ViewChild('content', {static: true}) content: ElementRef;

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

  public parentId: string = null;
  public id: string = null;
  public dataSourceTable: Record[] = [];
  public name: string = null;
  public costSum = 0;
  public lastModifiedDate: Date = null;
  public currencies = currencies;

  public CurrencyEnum = CurrencyEnum;

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
      this.parentId = params['parentId'];
      this.id = params['id'];
      this.name = params['name'];
      this.detailsFacade.loadRecords(this.id);
    });

    this.detailChanges$.subscribe(() => {
      this.detailsFacade.loadRecords(this.id);
    });
  }

  public onCreateRecord(): void {
    const data = {
      mode: FormModeEnum.Create,
      parent: this.id,
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
      parent: this.id,
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

  public onPrint(): void {
    this.dialogManagerService
      .openPrintDialog({
        multiply: false,
        tablesData: [{
          title: this.name,
          records: this.dataSourceTable,
          totalCost: this.getResultCost(this.dataSourceTable),
        }],
      })
      .subscribe(() => {});
  }

  private getResultCost(records: Record[]): number {
    const costs = records.map((record) => +record.cost).filter(Boolean);

    return costs.reduce((acc, cost) => acc + cost , 0);
  }

  private getLastModifiedDate(records: Record[]): Date {
    const EMPTY = null;
    const allDates = records.filter((row) => row.date).map((row) => (new Date(row.date)).getTime());
    const lastModifiedDate = allDates.length ? new Date(Math.max(...allDates)) : EMPTY;

    return lastModifiedDate;
  }
}
