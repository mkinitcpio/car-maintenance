import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailComponent } from './detail.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { detailsReducer } from './state/reducers';

import { DetailsFacade } from './state/details.facade';
import { EffectsModule } from '@ngrx/effects';
import { DetailsEffects } from './state/effects';
import { EmptyModule } from '../empty/empty.module';
import { CreateRecordComponent } from './create-record/create-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailComponent,
    CreateRecordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
    EmptyModule,
  ],
  providers: [
    DetailsFacade,
  ],
  exports: [
    DetailComponent,
  ],
})
export class DetailModule {}
