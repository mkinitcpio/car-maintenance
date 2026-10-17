import { Component, Input, OnInit } from '@angular/core';
import { SourceCodeIllustrationComponent } from './source-code-illustration/source-code-illustration.component';
import { FeedbackIllustrationComponent } from './feedback-illustration/feedback-illustration.component';
import { DocumentationIllustrationComponent } from './documentation-illustration/documentation-illustration.component';
import { ChangelogIllustrationComponent } from './changelog-illustration/changelog-illustration.component';
import { CmTextBody } from '@shared/components/typography/text-body/text-body';
import { CmTextHeader } from '@shared/components/typography/text-header/text-header';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

type DashboardItemSize = 'm' | 's';
type DashboardContentType = 'changelog' | 'feedback' | 'sourceCode' | 'documentation';

@Component({
    selector: 'app-dashboard-item',
    templateUrl: './dashboard-item.component.html',
    styleUrls: ['./dashboard-item.component.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        MatRippleModule,
        CmTextHeader,
        CmTextBody,
        ChangelogIllustrationComponent,
        DocumentationIllustrationComponent,
        FeedbackIllustrationComponent,
        SourceCodeIllustrationComponent,
    ]
})
export class DashboardItemComponent implements OnInit {

  @Input()
  external: boolean;

  @Input()
  type: DashboardContentType;

  @Input()
  size: DashboardItemSize = 'm';

  @Input()
  header: string;

  @Input()
  description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
