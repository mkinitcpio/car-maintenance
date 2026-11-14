import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { carCategoryReducer } from './state/features/car-category/reducers';
import { CarCategoryEffects } from './state/features/car-category/effects';

import { maintenanceReducer } from './state/features/maintenance/reducers';
import { MaintenanceEffects } from './state/features/maintenance/effects';

import { detailsReducer } from '../maintenance/detail/state/reducers';
import { DetailsEffects } from '../maintenance/detail/state/effects';
import { categoryDetailsReducer } from '../maintenance/category-details/state/reducers';
import { CategoryDetailsEffects } from '../maintenance/category-details/state/effects';

import { navigationReducer } from '../maintenance/navigation/state/reducers';
import { NavigationEffects } from '../maintenance/navigation/state/effects';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('carCategory', carCategoryReducer),
    EffectsModule.forFeature([ CarCategoryEffects ]),
    StoreModule.forFeature('maintenance', maintenanceReducer),
    EffectsModule.forFeature([ MaintenanceEffects ]),
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([ DetailsEffects ]),
    StoreModule.forFeature('categoryDetails', categoryDetailsReducer),
    EffectsModule.forFeature([ CategoryDetailsEffects ]),
    StoreModule.forFeature('navigation', navigationReducer),
    EffectsModule.forFeature([ NavigationEffects ]),
  ]
})
export class CoreModule { }
