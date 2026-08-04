import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
    selector: 'cm-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent {

  readonly value = input<boolean>();

  readonly change = output<boolean>();

  public onChange(event: any): void {
    event.stopPropagation();
    this.change.emit(event.target.checked as boolean);
  }
}
