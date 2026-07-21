import {
  computed,
  Directive,
  input,
} from "@angular/core";
import { CmLineClampStyles } from "./interface";

@Directive({
  standalone: true,
  selector: '[cmlineClamp]',
  host: {
    class: 'cm-line-clamp',
    '[style.-webkit-line-clamp]': 'styles().lineClamp',
    '[style.word-break]': 'styles().wordBreak'
  }
})
export class CmLineClamp {

  public cmLineClamp = input(1, { transform: Number });

  private readonly SINGLE_LINE = 1;

  public styles = computed(() => {
    const lines = this.cmLineClamp();
    const styles: Partial<CmLineClampStyles> = {};

    styles.lineClamp = lines;

    if(lines === this.SINGLE_LINE) {
      styles.wordBreak = 'break-all';
    }

    return styles;
  });
}