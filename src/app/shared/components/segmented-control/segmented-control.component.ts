import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CmTextBody } from '../typography/text-body/text-body';

export interface SegmentedControlOption<T = string> {
  value: T;
  label: string;
}

@Component({
    selector: 'cm-segmented-control',
    templateUrl: './segmented-control.component.html',
    styleUrls: ['./segmented-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      TranslateModule,
      CmTextBody,
    ]
})
export class SegmentedControlComponent<T = string> {

  public options = input<SegmentedControlOption<T>[]>([]);
  public value = input<T>();

  public readonly valueChange = output<T>();

  public onSelect(value: T): void {
    if (value === this.value()) {
      return;
    }

    this.valueChange.emit(value);
  }
}
