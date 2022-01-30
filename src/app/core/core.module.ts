import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { carCategoryReducer } from './state/features/car-category/reducers';
import { CarCategoryEffects } from './state/features/car-category/effects';

import { maintenanceReducer } from './state/features/maintenance/reducers';
import { MaintenanceEffects } from './state/features/maintenance/effects';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('carCategory', carCategoryReducer),
    EffectsModule.forFeature([ CarCategoryEffects ]),
    StoreModule.forFeature('maintenance', maintenanceReducer),
    EffectsModule.forFeature([ MaintenanceEffects ]),
  ]
})
export class CoreModule { }
