import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDetailsComponent } from './category-details.component';
import { RecordsTableModule } from '../shared/components';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { categoryDetailsReducer } from './state/reducers';
import { CategoryDetailsEffects } from './state/effects';
import { CategoryDetailsFacade } from './state/category-details.facade';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@shared/services/utils.service';
import { CurrencyModule } from '@shared/currency/currency.module';
import { WidgetModule } from '@shared/components/widget/widget.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { UbuntuContainerModule } from '@shared/ubuntu/ubuntu-container/ubuntu-container.module';
import { DetailsModule } from '@shared/components/details/details.module';
import { ButtonModule } from '@shared/components/button/button.module';
import { RichWidgetModule } from '@shared/components/rich-widget/rich-widget.module';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [CategoryDetailsComponent],
  imports: [
    CommonModule,
    RecordsTableModule,
    MatIconModule,
    StoreModule.forFeature('categoryDetails', categoryDetailsReducer),
    EffectsModule.forFeature([CategoryDetailsEffects]),
    TranslateModule,
    CurrencyModule,
    WidgetModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    UbuntuContainerModule,
    ButtonModule,
    RichWidgetModule,
    DetailsModule,
    CurrencyModule,
    MatDividerModule,
  ],
  providers: [
    CategoryDetailsFacade,
    UtilsService,
  ]
})
export class CategoryDetailsModule { }
