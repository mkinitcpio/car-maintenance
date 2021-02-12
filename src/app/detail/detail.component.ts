import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormModeEnum } from '../shared/components/create-dialog/form-mode.enum';
import { DetailsFacade } from './state/details.facade';
import { Record } from './state/interface';
import {SubscriptionListener} from "../core/subscription-listener";
import { DialogManagerService } from '../shared/services/dialog-manager.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends SubscriptionListener implements OnInit {

  parentId = null;

  public dataSourceTable: Record[] = [];
  public name: string = null;
  public costSum = 0;

  constructor(
    private route: ActivatedRoute,
    private detailsFacade: DetailsFacade,
    private dialogManagerService: DialogManagerService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.listenLoadedEntity$<Record[]>(this.detailsFacade.details$)
      .subscribe(([_, curr]) => {
        this.dataSourceTable = curr.value;
        this.costSum = this.dataSourceTable.reduce((acc, curr) => acc + +curr.cost , 0);
      });

    this.route.params.subscribe((params) => {
      this.parentId = params['id'];
      this.name = params['name'];
      this.detailsFacade.loadRecords(this.parentId);
    });

    this.listenLoadedEntity$<Record[]>(this.detailsFacade.newDetails$)
      .subscribe(() => {
        this.detailsFacade.loadRecords(this.parentId);
      });

    this.listenLoadedEntity$([
      this.detailsFacade.editDetail$,
      this.detailsFacade.newDetails$,
      this.detailsFacade.deleteDetail$,
    ]).subscribe(() => {
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

  public onDelete(id: string): void {
    this.detailsFacade.deleteRecord(id);
  }
}
