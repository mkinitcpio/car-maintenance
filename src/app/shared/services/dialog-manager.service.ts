
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
import { CurrencyDialogComponent } from '@shared/components/currency-dialog/currency-dialog.component';

import { CarCategoryFormData } from '@core/interfaces/car-category';
import { AccountDialogComponent } from '@shared/components/account-dialog/account-dialog.component';
import { FeedbackDialogComponent } from '@shared/components/feedback-dialog/feedback-dialog.component';
import { FeedbackTypeEnum } from '@shared/components/feedback-dialog/feedback-type.enum';
import { MoveDialogComponent } from '@shared/components/move-dialog/move-dialog.component';
import { MoveDialogData } from '@shared/components/move-dialog/interfaces';
import { SaveDialogData } from './abstract-export.service';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor(private dialog: MatDialog) {}

  public openCategoryDialog(data: any): Observable<Category> {
    return this.dialog
      .open(CreateDialogComponent, {
        width: "380px",
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
        maxHeight: "90%",
        width: "512px",
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
        width: "380px",
        panelClass: "dialog-custom",
        data,
      })
      .afterClosed()
      .pipe<Record>(filter<Record>(Boolean));
  }

  public openReleaseNotesDialog(data: ReleaseNotes): Observable<void> {
    return this.dialog
      .open(ReleaseNotesComponent, {
        maxHeight: "80%",
        width: "564px",
        autoFocus: false,
        panelClass: "dialog-notes",
        data,
      })
      .afterClosed();
  }

  public openDeleteCategoryDialog(params: { name }): Observable<boolean> {
    return this.dialog
      .open(DeleteDialogComponent, {
        width: "356px",
        panelClass: "dialog-delete",
        data: {
          text: "DIALOG.DELETE.TEXT",
          params,
        },
        autoFocus: false,
      })
      .afterClosed()
      .pipe<boolean>(filter<boolean>(Boolean));
  }

  public openDeleteRecordDialog(params: { name }): Observable<boolean> {
    return this.dialog
      .open(DeleteDialogComponent, {
        width: "380px",
        panelClass: "dialog-delete",
        data: {
          text: "DIALOG.DELETE.TEXT",
          params,
        },
      })
      .afterClosed()
      .pipe<boolean>(filter<boolean>(Boolean));
  }

  public openCurrencyDialog(): Observable<boolean> {
    return this.dialog
      .open(CurrencyDialogComponent, {
        width: "380px",
        panelClass: "dialog-currency",
        disableClose: true,
        autoFocus: false,
      })
      .afterClosed()
      .pipe<boolean>(filter<boolean>(Boolean));
  }

  public openSettingsDialog(): void {
    this.dialog
      .open(SettingsComponent, {
        disableClose: true,
        width: "564px",
        panelClass: "dialog-settings",
      });
  }

  public openAccountDialog(): void {
    this.dialog
      .open(AccountDialogComponent, {
        disableClose: true,
        width: "320px",
        panelClass: "dialog-account",
      });
  }

  public openFeedbackDialog(type?: FeedbackTypeEnum): void {
    this.dialog
      .open(FeedbackDialogComponent, {
        disableClose: true,
        width: "380px",
        panelClass: "dialog-feedback",
        data: {
          type,
        },
      });
  }

  public openPrintDialog(data: PrintDialogConfig): Observable<SaveDialogData | null> {
    return this.dialog
      .open<PrintDialogComponent, PrintDialogConfig, SaveDialogData>
    (PrintDialogComponent, {
      disableClose: true,
      width: "846px",
      panelClass: "dialog-print",
      data,
      autoFocus: false,
    }).afterClosed();
  }

  public openMoveDialog(data: MoveDialogData): Observable<string> {
    return this.dialog
      .open(MoveDialogComponent, {
        disableClose: true,
        width: "340px",
        data,
        panelClass: "dialog-feedback",
        autoFocus: false,
      })
      .afterClosed();
  }
}
