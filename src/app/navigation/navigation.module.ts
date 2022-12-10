import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { navigationReducer } from './state/reducers';
import { NavigationFacade } from './state/navigation.facade';
import { NavigationEffects } from './state/effects';
import { CategoriesTreeModule } from './categories-tree/categories-tree.module';
import { TabsModule } from '@shared/components/tabs/tabs.module';
import { ButtonModule } from '@shared/components/button/button.module';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('navigation', navigationReducer),
    EffectsModule.forFeature([ NavigationEffects ]),
    CategoriesTreeModule,
    TabsModule,
    MatBadgeModule,
    ButtonModule,
  ],
  providers: [
    NavigationFacade,
  ],
  exports: [
    NavigationComponent,
  ]
})
export class NavigationModule { }
