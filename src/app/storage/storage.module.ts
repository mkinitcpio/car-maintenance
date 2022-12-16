import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageComponent } from './storage.component';
import { DetailsModule } from '@shared/components/details/details.module';

import { StorageRoutingModule } from './storage-routing.module';

@NgModule({
  declarations: [
    StorageComponent
  ],
  imports: [
    CommonModule,
    DetailsModule,
    StorageRoutingModule,
  ]
})
export class StorageModule { }
