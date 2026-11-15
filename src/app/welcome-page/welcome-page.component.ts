import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ExternalLinkService } from '@core/services';
import { FeedbackTypeEnum } from '@shared/components/feedback-dialog/feedback-type.enum';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { DatabaseSelectComponent } from '../database-select/database-select.component';
import { CmButton } from '@shared/components/button/button';
import { AppConfig } from 'environments/environment';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss'],
    standalone: true,
    imports: [
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
    DatabaseSelectComponent,
    CmButton
],
})
export class WelcomePageComponent {

  private readonly mailUrl = `${AppConfig.links.mail}?subject=Question`;

  constructor(
    private externalLinkService: ExternalLinkService,
    private dialogManagerService: DialogManagerService
  ) {}

  public onOpenGitHub(): void {
    this.externalLinkService.open(AppConfig.links.sourceCode);
  }

  public onOpenMail(): void {
    this.externalLinkService.open(this.mailUrl);
  }

  public onOpenFeedback(): void {
    this.dialogManagerService.openFeedbackDialog(FeedbackTypeEnum.Question);
  }

}