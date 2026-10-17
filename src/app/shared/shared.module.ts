import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';

import { DialogManagerService } from './services/dialog-manager.service';
import { UtilsService } from './services/utils.service';

@NgModule({
  providers: [
    DialogManagerService,
    UtilsService,
  ],
  imports: [
    PageNotFoundComponent,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TranslateModule,
    FormsModule,
    MaterialModule,
  ],
})
export class SharedModule {}
