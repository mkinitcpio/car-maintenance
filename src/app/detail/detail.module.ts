import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';

import { DetailComponent } from './detail.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { detailsReducer } from './state/reducers';

import { DetailsFacade } from './state/details.facade';

@NgModule({
  declarations: [
    DetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DetailRoutingModule,
    StoreModule.forFeature('details', detailsReducer),
  ],
  providers: [
    DetailsFacade,
  ],
  exports: [
    DetailComponent,
  ],
})
export class DetailModule {}
