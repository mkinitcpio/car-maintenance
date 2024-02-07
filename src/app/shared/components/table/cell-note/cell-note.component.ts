import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'cm-cell-note',
  templateUrl: './cell-note.component.html',
  styleUrl: './cell-note.component.scss',
  imports: [
    MatIconModule,
    MatTooltipModule,
  ],
})
export class CellNoteComponent {
  @Input() value: string;
}
