import { trigger, transition, animate, style } from '@angular/animations';
import { ColorComponent } from './color/color.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, input, output } from '@angular/core';
import { Color } from '../../settings/color-interface';
import { ColorEnum } from '../../settings/colors-enum';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-colors',
    templateUrl: './colors.component.html',
    styleUrls: ['./colors.component.scss'],
    animations: [
        trigger("flyInOut", [
            transition(":enter", [
                style({
                    transform: 'scale(0)',
                }),
                animate('0.2s 0.2s ease-in', style({
                    transform: "scale(1)"
                })),
            ]),
            transition(":leave", [
                animate('0.2s ease-in', style({
                    transform: 'scale(0)',
                })),
            ]),
        ]),
    ],
    imports: [CommonModule, MatIconModule, ColorComponent]
})
export class ColorsComponent {

  @ViewChild("coverRef", { static: true }) coverRef: ElementRef;

  colors = input.required<Color[]>();

  disable = input<boolean>();

  selected = input.required<ColorEnum>();

  constructor() {
    effect(() => {
      const index = this.colors().findIndex(c => c.color === this.selected());

      if(index != -1) {
        this.isActive = true;
        this.animateCoverMovement();
        this.updateTabCoverPosition(index);
      } else {
        this.isActive = false;
      }

      this.selectedColor = this.selected();
    });
  }

  select = output<ColorEnum>();

  private readonly tabWidth = 28;
  public selectedColor: ColorEnum;
  public isActive = false;

  public onSelect(selectedColor: ColorEnum): void {
    !this.disable() && this.select.emit(selectedColor);
  }

  private updateTabCoverPosition(offset: number): void {
    this.coverRef.nativeElement.style.left = `${
      this.tabWidth * offset + offset * 8
    }px`;
  }

  public animateCoverMovement(): void {
    const cover = this.coverRef.nativeElement.querySelector('.cover') as HTMLElement;
    if(cover) {
      cover.classList.remove('jello');
      void cover.offsetWidth;
      cover.classList.add('jello');
    }
  }

}
