import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CmTextHeader } from '../typography/text-header/text-header';
import { CommonModule } from '@angular/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'content-container',
    templateUrl: './content-container.component.html',
    styleUrls: ['./content-container.component.scss'],
    imports: [CommonModule, CmTextHeader]
})
export class ContentContainerComponent {

  title = input<string>();
}
