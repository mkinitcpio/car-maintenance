import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageComponent } from './storage.component';
import { DetailsModule } from '@shared/components/details/details.module';

import { StorageRoutingModule } from './storage-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StorageComponent
  ],
  imports: [
    CommonModule,
    DetailsModule,
    StorageRoutingModule,
    MatIconModule,
    TranslateModule,
  ]
})
export class StorageModule { }
