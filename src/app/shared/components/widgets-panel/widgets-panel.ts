import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RichWidgetModule } from '../rich-widget/rich-widget.module';
import { Widget } from './interface';

@Component({
  selector: 'cm-widgets-panel',
  templateUrl: './widgets-panel.html',
  styleUrls: ['./widgets-panel.scss'],
  standalone: true,
  imports: [
    RichWidgetModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetsPanel {

  data = input<Widget[]>();
}
