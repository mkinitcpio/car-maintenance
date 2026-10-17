import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RichWidgetComponent } from '../rich-widget/rich-widget.component';
import { Widget } from './interface';

@Component({
  selector: 'cm-widgets-panel',
  templateUrl: './widgets-panel.html',
  styleUrls: ['./widgets-panel.scss'],
  standalone: true,
  imports: [
    RichWidgetComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetsPanel {

  data = input<Widget[]>();
}
