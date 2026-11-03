import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CmTextBody } from '../typography/text-body/text-body';
import { EmptyStateIllustration } from './empty-state-illustration';
import { PaperIllustrationComponent } from './illustrations/paper-illustration';

export type EmptyStateSize = 's' | 'm' | 'l';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cm-empty-state',
  standalone: true,
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  imports: [
    TranslateModule,
    CmTextBody,
    PaperIllustrationComponent
],
})
export class EmptyStateComponent {

  text = input('');

  size = input<EmptyStateSize>('m');

  customIllustration = contentChild(EmptyStateIllustration);
}
