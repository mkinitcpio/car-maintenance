
import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Record } from '../../detail/state/interface';
import { Category } from '../../navigation/state/interface';
import { CreateDialogComponent } from '../components/create-dialog/create-dialog.component';
import { CreateRecordComponent } from '../components/create-record/create-record.component';
import { ReleaseNotesComponent } from '../components/release-notes/release-notes.component';

import { ReleaseNotes } from '../components/release-notes/interface';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { PrintDialogComponent } from '../components/print-dialog/print-dialog.component';
import { PrintDialogConfig } from '@shared/components/print-dialog/print-dialog-config';
import { CreateCarDialogComponent } from '@shared/components/create-car-dialog/create-car-dialog.component';

import { CarCategoryFormData } from '@core/interfaces/car-category';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor(private dialog: MatDialog) {}

  public openCategoryDialog(data: any): Observable<Category> {
    return this.dialog
      .open(CreateDialogComponent, {
        width: "400px",
        panelClass: "dialog-custom",
        data,
        disableClose: true,
      })
      .afterClosed()
      .pipe<Category>(filter<Category>(Boolean));
  }

  public openCarDialog(data: any): Observable<CarCategoryFormData> {
    return this.dialog
      .open(CreateCarDialogComponent, {
        maxWidth: "50%",
        maxHeight: "90%",
        width: "768px",
        panelClass: "dialog-car",
        data,
        disableClose: true,
      })
      .afterClosed()
      .pipe<CarCategoryFormData>(filter<CarCategoryFormData>(Boolean));
  }

  public openRecordDialog(data: any): Observable<Record> {
    return this.dialog
      .open(CreateRecordComponent, {
        width: "400px",
        panelClass: "dialog-custom",
        data,
      })
      .afterClosed()
      .pipe<Record>(filter<Record>(Boolean));
  }

  public openReleaseNotesDialog(data: ReleaseNotes): void {
    this.dialog.open(ReleaseNotesComponent, {
      maxHeight: "80%",
      width: "1000px",
      autoFocus: false,
      panelClass: "dialog-notes",
      data,
    });
  }

  public openDeleteCategoryDialog(categoryName: string): Observable<boolean> {
    return this.dialog
      .open(DeleteDialogComponent, {
        width: "380px",
        panelClass: "dialog-delete",
        data: {
          text: "DIALOG.DELETE.CATEGORY",
          name: categoryName,
        },
        autoFocus: false,
      })
      .afterClosed()
      .pipe<boolean>(filter<boolean>(Boolean));
  }

  public openDeleteRecordDialog(categoryName: string): Observable<boolean> {
    return this.dialog
      .open(DeleteDialogComponent, {
        width: "380px",
        panelClass: "dialog-delete",
        data: {
          text: "DIALOG.DELETE.RECORD",
          name: categoryName,
        },
      })
      .afterClosed()
      .pipe<boolean>(filter<boolean>(Boolean));
  }

  public openSettingsDialog(): void {
    this.dialog
      .open(SettingsComponent, {
        disableClose: true,
        width: "580px",
        panelClass: "dialog-settings",
      });
  }

  public openFeedbackDialog(): void {
  }

  public openPrintDialog(data: PrintDialogConfig): Observable<void> {
    return this.dialog
      .open(PrintDialogComponent, {
        disableClose: true,
        width: "820px",
        panelClass: "dialog-print",
        data,
        autoFocus: false,
      })
      .afterClosed();
  }
}
