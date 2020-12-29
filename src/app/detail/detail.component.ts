import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { AutoCloseable } from '../core/auto-closeable';
import { Status } from '../state/interface';
import { DetailsFacade } from './state/details.facade';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends AutoCloseable implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'date', 'cost'];
  dataSourceTable = [];

  constructor(private detailsFacade: DetailsFacade, private route: ActivatedRoute,) {
    super();
  }

  ngOnInit(): void {
    this.detailsFacade.details$
        .pipe(
          pairwise(),
          filter(([prev, curr]) => prev.status === Status.Loading && curr.status === Status.Success)
        )
        .subscribe(([_, curr]) => {
          this.dataSourceTable = curr.value;
        });

        this.route.queryParams.subscribe(params => {
          console.log(params);
          // this.detailsFacade.loadRecords(id);
        });
   }
}
