
import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Record } from '../../detail/state/interface';
import { Category } from '../../navigation/state/interface';
import { CreateDialogComponent } from '../components/create-dialog/create-dialog.component';
import { CreateRecordComponent } from '../components/create-record/create-record.component';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor(private dialog: MatDialog) {}

  public openCategoryDialog(data: any): Observable<Category> {
    return this.dialog
      .open(CreateDialogComponent, {
        width: "380px",
        panelClass: "custom-dialog",
        data,
      })
      .afterClosed()
      .pipe<Category>(filter<Category>(Boolean));
  }

  public openRecordDialog(data: any): Observable<Record> {
    return this.dialog
      .open(CreateRecordComponent, {
        width: "380px",
        panelClass: "custom-dialog",
        data,
      })
      .afterClosed()
      .pipe<Record>(filter<Record>(Boolean));
  }
}
