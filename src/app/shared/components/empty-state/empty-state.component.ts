import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CmTextBody } from '../typography/text-body/text-body';

export type EmptyStateSize = 's' | 'm' | 'l';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cm-empty-state',
  standalone: true,
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  imports: [
    TranslateModule,
    CmTextBody
],
})
export class EmptyStateComponent {

  text = input('');

  size = input<EmptyStateSize>('m');
}
