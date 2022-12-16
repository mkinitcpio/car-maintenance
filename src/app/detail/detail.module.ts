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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordsTableModule } from '../shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonPipesModule } from '../shared/pipes/common-pipes.module';
import { CurrencyModule } from '../shared/currency/currency.module';
import { WidgetModule } from '@shared/components/widget/widget.module';
import { ButtonModule } from '@shared/components/button/button.module';
import { RichWidgetModule } from '@shared/components/rich-widget/rich-widget.module';
import { UbuntuContainerModule } from '@shared/ubuntu/ubuntu-container/ubuntu-container.module';
import { DetailsModule } from '@shared/components/details/details.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RecordsTableModule,
    ReactiveFormsModule,
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
    EmptyModule,
    TranslateModule,
    MatIconModule,
    CommonPipesModule,
    CurrencyModule,
    WidgetModule,
    ButtonModule,
    RichWidgetModule,
    UbuntuContainerModule,
    DetailsModule,
    RouterModule,
  ],
  providers: [
    DetailsFacade,
  ],
  exports: [
    DetailComponent,
  ],
})
export class DetailModule {}
