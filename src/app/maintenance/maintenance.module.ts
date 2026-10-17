import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaintenanceComponent } from './maintenance.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationModule } from '../navigation/navigation.module';
import { SideNavTrackerDirective } from '@shared/directives/side-nav-tracker.directive';
import { SideNavigationTrackerService } from 'app/home/side-navigation-tracker.service';
import { categoryDetailsReducer } from 'app/category-details/state/reducers';
import { CategoryDetailsEffects } from 'app/category-details/state/effects';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MaintenanceComponent,
    SideNavTrackerDirective,
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MatSidenavModule,
    RouterModule,
    NavigationModule,
    StoreModule.forFeature('categoryDetails', categoryDetailsReducer),
    EffectsModule.forFeature([CategoryDetailsEffects]),
  ],
  providers: [
    SideNavigationTrackerService,
  ],
  exports: [
    MaintenanceComponent,
    NavigationModule,
  ]
})
export class MaintenanceModule { }
