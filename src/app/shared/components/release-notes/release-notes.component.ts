import { Inject, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { ReleaseNotes } from './interface';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {

  @ViewChild('versionSelect', {static: true})
  versionSelect: MatSelect;

  public releases: string[] = [];
  public selectedVersion: string = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public releaseNotes: ReleaseNotes,
    public dialogRef: MatDialogRef<CreateRecordComponent>,
  ) {
    this.releases = this.releaseNotes.releases;
    this.selectedVersion = this.releases[0];
  }

  ngOnInit(): void {
    this.versionSelect.valueChange.subscribe((version: string) => {
      this.selectedVersion = version;
    });
  }
}
