import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CmLineClamp } from '../../../directives/line-clamp/line-clamp';
import { CmTextBody } from '../../typography/text-body/text-body';

@Component({
  selector: 'cm-cell-text',
  templateUrl: './cell-text.component.html',
  styleUrl: './cell-text.component.scss',
  imports: [
    CmLineClamp,
    CmTextBody,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellTextComponent {
  readonly value = input<string>();
}
