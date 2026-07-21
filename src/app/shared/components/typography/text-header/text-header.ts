import { Component, input, effect, ViewEncapsulation } from "@angular/core";
import { AbstractCmText } from '../common/abstract-text';

@Component({
  standalone: true,
  template: '<ng-content/>',
  styleUrls: ['./text-header.scss'],
  selector: '[cmTextHeader]',
  encapsulation: ViewEncapsulation.None,
})
export class CmTextHeader extends AbstractCmText {

  public baseClass = 'cm-text-header';
  public cmTextHeader = input.required<string>();

  initEffectRef = effect(() => this.computeClasses(this.cmTextHeader()));
}
