import { Component, Input } from '@angular/core';
import { LocalizedDatePipe } from '@shared/pipes/localized-date.pipe';
import { CmTextBody } from "@shared/components/typography/text-body/text-body";

@Component({
    selector: 'cm-cell-date',
    templateUrl: './cell-date.component.html',
    styleUrl: './cell-date.component.scss',
    imports: [
    LocalizedDatePipe,
    CmTextBody,
]
})
export class CellDateComponent {
  @Input() value: number;
}
