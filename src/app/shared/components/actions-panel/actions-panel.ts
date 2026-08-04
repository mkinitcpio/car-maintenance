import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'cm-actions-panel',
  templateUrl: './actions-panel.html',
  styleUrls: ['./actions-panel.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsPanel {
}
