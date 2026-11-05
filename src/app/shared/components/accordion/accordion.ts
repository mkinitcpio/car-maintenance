import { CmTextHeader } from '../typography/text-header/text-header';
import { MatIcon } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component, afterNextRender, contentChild, inject, input, linkedSignal, output, signal, TemplateRef } from '@angular/core';
import { AccordionVariant } from "./interface";
import { NgTemplateOutlet } from '@angular/common';

@Component({
  standalone: true,
  selector: 'cm-accordion',
  templateUrl: 'accordion.html',
  styleUrls: ['./accordion.scss'],
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

  protected readonly animationsReady = signal(false);

  constructor() {
    afterNextRender(() => {
      requestAnimationFrame(() => this.animationsReady.set(true));
    });
  }

  public onExpand(): void {
    this.expanded.update(opened => !opened);
    this.opened.emit(this.expanded());
  }
}
