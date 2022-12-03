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
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ButtonModule } from '@shared/components/button/button.module';
import { MatIconModule } from '@angular/material/icon';
import { SideNavTrackerDirective } from '@shared/directives/side-nav-tracker.directive';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [HomeComponent, NavigationBarComponent, SideNavTrackerDirective],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NavigationModule,
    DetailModule,
    EmptyModule,
    CategoryDetailsModule,
    ButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  providers: [
    SideNavigationTrackerService,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule {}
