import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ElectronService } from '@core/services';
import { FeedbackTypeEnum } from '@shared/components/feedback-dialog/feedback-type.enum';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { ButtonModule } from '@shared/components/button/button.module';
import { DatabaseSelectComponent } from '../database-select/database-select.component';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        MatTooltipModule,
        TranslateModule,
        ButtonModule,
        DatabaseSelectComponent,
    ],
})
export class WelcomePageComponent {

  private readonly GITHUB_URL = "https://github.com/mkinitcpio/car-maintenance";

  constructor(
    private electronService: ElectronService,
    private dialogManagerService: DialogManagerService
  ) {}

  public onOpenGitHub(): void {
    this.electronService.shell.openExternal(this.GITHUB_URL);
  }

  public onOpenMail(): void {
    this.electronService.shell.openExternal("mailto:aliaksandr.kazhamiaka@gmail.com?subject=Question");
  }

  public onOpenFeedback(): void {
    this.dialogManagerService.openFeedbackDialog(FeedbackTypeEnum.Question);
  }

}