import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { FormModeEnum } from '../navigation/create-dialog/form-mode.enum';
import { Status } from '../state/interface';
import { CreateRecordComponent } from './create-record/create-record.component';
import { DetailsFacade } from './state/details.facade';
import { Record } from './state/interface';
import {SubscriptionListener} from "../core/subscription-listener";

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
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private detailsFacade: DetailsFacade,
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

    merge(
      this.detailsFacade.editDetail$,
      this.detailsFacade.newDetails$,
      this.detailsFacade.deleteDetail$,
    ).pipe(
      pairwise(),
      filter(([prev, curr]) => prev.status === Status.Loading && curr.status === Status.Success),
    ).subscribe(() => {
      this.detailsFacade.loadRecords(this.parentId);
    });

    this.listenLoadedEntity$<Record[]>(this.detailsFacade.deleteDetail$)
      .subscribe(([_, curr]) => {
        if(this.parentId === curr.value) {
          this.router.navigate([""]);
        }
      });
  }

  public onCreateRecord(): void {
    const dialogRef = this.dialog.open(CreateRecordComponent, {
      width: "380px",
      panelClass: "custom-dialog",
      data: {
        mode: FormModeEnum.Create,
        parent: this.parentId,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((record: Record) => {
        this.detailsFacade.createNewRecord(record);
      });
  }

  public onEdit(id: string): void {
    const dialogRef = this.dialog.open(CreateRecordComponent, {
      width: "380px",
      panelClass: "custom-dialog",
      data: {
        mode: FormModeEnum.Edit,
        parent: this.parentId,
        formData: this.dataSourceTable.find(row => row.id === id),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((record: Record) => {
        this.detailsFacade.editRecord(record);
      });
  }

  public onDelete(id: string): void {
    this.detailsFacade.deleteRecord(id);
  }
}
