import { MatIcon } from '@angular/material/icon';
import { ActionsPanel } from './../actions-panel/actions-panel';
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CmTextBody } from '../typography/text-body/text-body';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'cm-navigation-panel',
    templateUrl: './navigation-panel.html',
    styleUrls: ['./navigation-panel.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    ActionsPanel,
    MatIcon,
    CmTextBody,
    TranslateModule
],
})
export class NavigationPanel {

  readonly navigationIndex = input<number>(0);
  readonly navigationChange = output<number>();

  onNavigationChange(index: number): void {
    this.navigationChange.emit(index);
  }

}
