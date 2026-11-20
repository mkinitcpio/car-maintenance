import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CmTextHeader } from '../../typography/text-header/text-header';
import { NgStyle } from '@angular/common';

type IBarChartData = {
  lineX: string[]
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'bar-chart',
  templateUrl: './bar-chart.html',
  styleUrls: ['./bar-chart.scss'],
  imports: [
    CmTextHeader,
    NgStyle
  ],
})
export class BarChart {

  protected readonly header = input<string>();
  protected readonly data = input<any>()

  public columns = Array.from({length: 12})
}
