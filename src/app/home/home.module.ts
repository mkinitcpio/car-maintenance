import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

import { NavigationModule } from '../navigation/navigation.module';
import { DetailModule } from '../detail/detail.module';
import { EmptyModule } from '../empty/empty.module';
import { CategoryDetailsModule } from '../category-details/category-details.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ButtonModule } from '@shared/components/button/button.module';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MaintenanceModule } from 'app/maintenance/maintenance.module';
import { SideNavigationTrackerService } from './side-navigation-tracker.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HomeComponent, NavigationBarComponent],
  imports: [
    CommonModule,
    NavigationModule,
    DetailModule,
    EmptyModule,
    CategoryDetailsModule,
    MaintenanceModule,
    ButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    RouterModule,
    TranslateModule,
  ],
  providers: [
    SideNavigationTrackerService,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule {}
