import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

import { NavigationModule } from '../navigation/navigation.module';
import { DetailModule } from '../detail/detail.module';
import { EmptyModule } from '../empty/empty.module';
import { CategoryDetailsModule } from '../category-details/category-details.module';
import { SideNavigationTrackerService } from './side-navigation-tracker.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NavigationModule,
    DetailModule,
    EmptyModule,
    CategoryDetailsModule,
  ],
  providers: [
    SideNavigationTrackerService,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule {}
