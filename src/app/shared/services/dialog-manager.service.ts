
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
import { FeedbackDialogComponent } from '../components/feedback-dialog/feedback-dialog.component';
import { PrintDialogComponent } from '../components/print-dialog/print-dialog.component';
import { PrintDialogConfig } from '@shared/components/print-dialog/print-dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor(private dialog: MatDialog) {}

  public openCategoryDialog(data: any): Observable<Category> {
    return this.dialog
      .open(CreateDialogComponent, {
        width: "480px",
        panelClass: "dialog-custom",
        data,
      })
      .afterClosed()
      .pipe<Category>(filter<Category>(Boolean));
  }

  public openRecordDialog(data: any): Observable<Record> {
    return this.dialog
      .open(CreateRecordComponent, {
        width: "480px",
        panelClass: "dialog-custom",
        data,
      })
      .afterClosed()
      .pipe<Record>(filter<Record>(Boolean));
  }

  public openReleaseNotesDialog(data: ReleaseNotes): void {
    this.dialog.open(ReleaseNotesComponent, {
      width: "580px",
      panelClass: "dialog-notes",
      data,
    });
  }

  public openDeleteCategoryDialog(categoryName: string): Observable<boolean> {
    return this.dialog
      .open(DeleteDialogComponent, {
        width: "380px",
        panelClass: "dialog-custom",
        data: {
          text: "DIALOG.DELETE.CATEGORY",
          name: categoryName,
        },
      })
      .afterClosed()
      .pipe<boolean>(filter<boolean>(Boolean));
  }

  public openDeleteRecordDialog(categoryName: string): Observable<boolean> {
    return this.dialog
      .open(DeleteDialogComponent, {
        width: "380px",
        panelClass: "dialog-custom",
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
    this.dialog
      .open(FeedbackDialogComponent, {
        disableClose: true,
        width: "380px",
        panelClass: "dialog-custom",
      });
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
