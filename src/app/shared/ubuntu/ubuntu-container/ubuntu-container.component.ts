import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { CmTextHeader } from '@shared/components/typography/text-header/text-header';
import { CmButton } from '@shared/components/button/button';

@Component({
  selector: 'ubuntu-container',
  templateUrl: './ubuntu-container.component.html',
  styleUrls: ['./ubuntu-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTooltip,
    MatIcon,
    CmTextHeader,
    CmButton
],
})
export class UbuntuContainerComponent {

  readonly title = input<string>();
  readonly info = input<string>();

  readonly expand = input<boolean>(true);

  readonly expandContent = signal(true);


  public toggle(): void {
    this.expandContent.update((state) => !state);
  }

}
