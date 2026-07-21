import {
  Directive,
  EffectRef,
  signal,
} from "@angular/core";

@Directive({
  host: {
    '[class]': 'classList()'
  },
})
export abstract class AbstractCmText {

  abstract initEffectRef: EffectRef;
  abstract baseClass: string;
  private commonClass: string = 'cm-text';

  protected classList = signal<string[]>([]);

  protected computeClasses(data: string): void {
    const classList = [this.baseClass];
    const [element, ...modifiers] = data.split(':');

    if(!element) {
      throw new Error("Element part in input 'element:?modifier' not provided");
    }

    classList.push(this.getClassFor(element));

    modifiers?.forEach(modifier => {
      classList.push(this.getCommonClassFor(modifier));
    });

    this.classList.set(classList);
  }

  private getClassFor(name: string): string {
    return `${this.baseClass}--${name}`;
  }

  private getCommonClassFor(name: string): string {
    return `${this.commonClass}--${name}`;
  }
}
