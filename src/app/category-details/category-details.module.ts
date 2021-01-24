import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDetailsComponent } from './category-details.component';
import { RecordsTableModule } from '../shared/components';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { categoryDetailsReducer } from './state/reducers';
import { CategoryDetailsEffects } from './state/effects';
import { CategoryDetailsFacade } from './state/category-details.facade';

@NgModule({
  declarations: [CategoryDetailsComponent],
  imports: [
    CommonModule,
    RecordsTableModule,
    StoreModule.forFeature('categoryDetails', categoryDetailsReducer),
    EffectsModule.forFeature([CategoryDetailsEffects]),
  ],
  providers: [
    CategoryDetailsFacade,
  ]
})
export class CategoryDetailsModule { }
