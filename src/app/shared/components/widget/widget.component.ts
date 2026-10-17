import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.scss'],
    imports: [CommonModule, MatIconModule, MatTooltipModule]
})
export class WidgetComponent {

  @Input()
  title: string;

  @Input()
  info: string;

  @Input()
  icon: string;
}
