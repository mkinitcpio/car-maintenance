import { Component, Input } from '@angular/core';
import { CommonPipesModule } from '@shared/pipes/common-pipes.module';

@Component({
    selector: 'cm-cell-date',
    templateUrl: './cell-date.component.html',
    styleUrl: './cell-date.component.scss',
    imports: [
        CommonPipesModule,
    ]
})
export class CellDateComponent {
  @Input() value: number;
}
