import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { detailsReducer } from './state/reducers';

import { DetailsFacade } from './state/details.facade';
import { EffectsModule } from '@ngrx/effects';
import { DetailsEffects } from './state/effects';
import { EmptyModule } from '../empty/empty.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@shared/components/button/button.module';
import { RichWidgetModule } from '@shared/components/rich-widget/rich-widget.module';
import { DetailsModule } from '@shared/components/details/details.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
    EmptyModule,
    MatIconModule,
    ButtonModule,
    RichWidgetModule,
    DetailsModule,
    RouterModule,
  ],
  providers: [
    DetailsFacade,
  ],
})
export class DetailModule {}
