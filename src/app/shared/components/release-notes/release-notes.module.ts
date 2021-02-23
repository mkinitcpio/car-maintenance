import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseNotesComponent } from './release-notes.component';
import { ReleaseNotesService } from './release-notes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UbuntuCloseButtonModule } from '../../ubuntu/ubuntu-close-button/ubuntu-close-button.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ReleaseNotesComponent
  ],
  providers: [
    ReleaseNotesService,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    TranslateModule,
    UbuntuCloseButtonModule,
  ]
})
export class ReleaseNotesModule { }
