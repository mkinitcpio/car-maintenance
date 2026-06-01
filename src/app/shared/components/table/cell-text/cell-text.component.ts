import { Component, Input } from '@angular/core';

@Component({
    selector: 'cm-cell-text',
    templateUrl: './cell-text.component.html',
    styleUrl: './cell-text.component.scss',
    imports: []
})
export class CellTextComponent {
  @Input() value: string;
}
