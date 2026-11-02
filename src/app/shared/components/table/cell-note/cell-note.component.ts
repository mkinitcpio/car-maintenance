import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cm-cell-note',
    templateUrl: './cell-note.component.html',
    styleUrl: './cell-note.component.scss',
    imports: [
        MatIconModule,
        MatTooltipModule,
    ]
})
export class CellNoteComponent {
  value = input<string>();
}
