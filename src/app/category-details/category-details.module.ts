import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDetailsComponent } from './category-details.component';
import { RecordsTableModule } from '../shared/components';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { categoryDetailsReducer } from './state/reducers';
import { CategoryDetailsEffects } from './state/effects';
import { CategoryDetailsFacade } from './state/category-details.facade';
import { HomeRoutingModule } from 'app/home/home-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CategoryDetailsComponent],
  imports: [
    CommonModule,
    RecordsTableModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forFeature('categoryDetails', categoryDetailsReducer),
    EffectsModule.forFeature([CategoryDetailsEffects]),
  ],
  providers: [
    CategoryDetailsFacade,
  ]
})
export class CategoryDetailsModule { }
