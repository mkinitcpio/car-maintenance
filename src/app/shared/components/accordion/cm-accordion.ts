import { CmTextHeader } from '../typography/text-header/text-header';
import { MatIcon } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component, contentChild, inject, input, linkedSignal, output, TemplateRef } from '@angular/core';
import { AccordionVariant } from "./interface";
import { NgTemplateOutlet } from '@angular/common';

@Component({
  standalone: true,
  selector: 'cm-accordion',
  templateUrl: 'cm-accordion.html',
  styleUrls: ['./cm-accordion.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CmTextHeader,
    NgTemplateOutlet,
    MatIcon
  ]
})
export class Accordion {

  readonly header = input.required<string>();
  readonly expand = input<boolean>(false);
  readonly variant = input.required<AccordionVariant>();
  readonly icon = input<string>();
  readonly customIcon = contentChild<TemplateRef<any>>('customIcon');

  readonly opened = output<boolean>();

  public expanded = linkedSignal<boolean>(() => this.expand());

  public onExpand(): void {
    this.expanded.update(opened => !opened);
    this.opened.emit(this.expanded());
  }
}
