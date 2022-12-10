import { Component } from '@angular/core';
import { ElectronService } from '@core/services';
import { FeedbackTypeEnum } from '@shared/components/feedback-dialog/feedback-type.enum';
import { DialogManagerService } from '@shared/services/dialog-manager.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
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