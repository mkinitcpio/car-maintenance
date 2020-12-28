import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { SharedModule } from '../shared/shared.module';

import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { navigationReducer } from './state/reducers';
import { NavigationFacade } from './state/navigation.facade';
import { NavigationEffects } from './state/effects';


@NgModule({
  declarations: [NavigationComponent, CreateDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('navigation', navigationReducer),
    EffectsModule.forFeature([ NavigationEffects ])
  ],
  providers: [
    NavigationFacade,
  ],
  exports: [
    NavigationComponent,
  ]
})
export class NavigationModule { }
