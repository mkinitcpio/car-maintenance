import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DetailsModule } from '@shared/components/details/details.module';
import { MatIconModule } from '@angular/material/icon';

import { DashboardItemModule } from './dashboard-item/dashboard-item.module';
import { FeedbackDialogModule } from '@shared/components/feedback-dialog/feedback-dialog.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DetailsModule,
    MatIconModule,
    DashboardItemModule,
    FeedbackDialogModule,
    DashboardRoutingModule,
    TranslateModule,
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
