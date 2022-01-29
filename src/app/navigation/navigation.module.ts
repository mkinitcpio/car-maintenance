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
import { SideNavTrackerDirective } from '../shared/directives/side-nav-tracker.directive';
import { TabsModule } from '@shared/components/tabs/tabs.module';

@NgModule({
  declarations: [
    NavigationComponent,
    SideNavTrackerDirective
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
  ],
  providers: [
    NavigationFacade,
  ],
  exports: [
    NavigationComponent,
  ]
})
export class NavigationModule { }
