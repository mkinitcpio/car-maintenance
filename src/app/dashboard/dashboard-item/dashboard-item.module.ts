import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardItemComponent } from './dashboard-item.component';
import { MatIconModule } from '@angular/material/icon';
import { ChangelogIllustrationComponent } from './changelog-illustration/changelog-illustration.component';
import { DocumentationIllustrationComponent } from './documentation-illustration/documentation-illustration.component';
import { FeedbackIllustrationComponent } from './feedback-illustration/feedback-illustration.component';
import { SourceCodeIllustrationComponent } from './source-code-illustration/source-code-illustration.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardItemComponent,
    ChangelogIllustrationComponent,
    DocumentationIllustrationComponent,
    FeedbackIllustrationComponent,
    SourceCodeIllustrationComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatRippleModule,
  ],
  exports: [
    DashboardItemComponent,
  ]
})
export class DashboardItemModule { }
