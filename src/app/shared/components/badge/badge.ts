import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CmTextBody } from '../typography/text-body/text-body';

export type BadgeVariant = 'primary' | 'neutral' | 'dangerous';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cm-badge',
  templateUrl: './badge.html',
  styleUrls: ['./badge.scss'],
  standalone: true,
  imports: [
    CmTextBody,
    MatIconModule,
  ],
})
export class Badge {

  readonly variant = input<BadgeVariant>('primary');

  readonly icon = input<string>();
  readonly label = input<string | number>();
}
