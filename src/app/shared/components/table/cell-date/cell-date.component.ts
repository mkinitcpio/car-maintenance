import { Component, Input } from '@angular/core';
import { CommonPipesModule } from '@shared/pipes/common-pipes.module';
import { CmTextBody } from "@shared/components/typography/text-body/text-body";

@Component({
    selector: 'cm-cell-date',
    templateUrl: './cell-date.component.html',
    styleUrl: './cell-date.component.scss',
    imports: [
    CommonPipesModule,
    CmTextBody,
]
})
export class CellDateComponent {
  @Input() value: number;
}
