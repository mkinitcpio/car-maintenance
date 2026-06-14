import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'ubuntu-container',
  templateUrl: './ubuntu-container.component.html',
  styleUrls: ['./ubuntu-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTooltip,
    MatIcon,
  ],
})
export class UbuntuContainerComponent {

  readonly title = input<string>();
  readonly hasBordersStyle = input(true);
  readonly info = input<string>();

}
