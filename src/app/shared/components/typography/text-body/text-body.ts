import { ChangeDetectionStrategy, Component, input, effect, ViewEncapsulation } from "@angular/core";
import { AbstractCmText } from '../common/abstract-text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: '[cmTextBody]',
  template: '<ng-content/>',
  styleUrls: ['./text-body.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CmTextBody extends AbstractCmText {

  public baseClass = 'cm-text-body';
  public cmTextBody = input.required<string>();

  initEffectRef = effect(() => this.computeClasses(this.cmTextBody()));
}
