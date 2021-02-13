import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseNotesComponent } from './release-notes.component';
import { ReleaseNotesService } from './release-notes.service';

@NgModule({
  declarations: [
    ReleaseNotesComponent
  ],
  providers: [
    ReleaseNotesService,
  ],
  imports: [
    CommonModule,
  ]
})
export class ReleaseNotesModule { }
