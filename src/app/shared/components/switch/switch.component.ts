import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {

  @Input()
  value: boolean;

  @Output()
  change: EventEmitter<boolean> = new EventEmitter();

  public onChange(event): void {
    event.stopPropagation();
    this.change.emit(event.target.checked as boolean);
  }
}
