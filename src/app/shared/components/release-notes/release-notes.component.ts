import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { ReleaseNotes } from './interface';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public releaseNotes: ReleaseNotes,
    public dialogRef: MatDialogRef<CreateRecordComponent>,
  ) { }
}
