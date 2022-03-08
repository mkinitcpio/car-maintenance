import { trigger, transition, animate, style } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Color } from '@shared/components/settings/color-interface';
import { ColorEnum } from '@shared/components/settings/colors-enum';

@Component({
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
        }),
        ),
      ]),
      transition(":leave", [
        animate('0.2s ease-in', style({
          transform: 'scale(0)',
        }),
        ),
      ]),
    ]),
  ],
})
export class ColorsComponent {

  @ViewChild("coverRef", { static: true }) coverRef: ElementRef;

  @Input()
  colors: Color[];

  @Input()
  disable: boolean;

  @Input()
  set selected(color: ColorEnum) {
    const index = this.colors.findIndex(c => c.color === color);

    if(index != -1) {
      this.isActive = true;
      this.animateCoverMovement();
      this.updateTabCoverPosition(index);
    } else {
      this.isActive = false;
    }

    this.selectedColor = color;
  }

  @Output()
  select: EventEmitter<ColorEnum> = new EventEmitter();

  private readonly tabWidth = 28;
  public selectedColor: ColorEnum;
  public isActive = false;

  public onSelect(selectedColor: ColorEnum): void {
    !this.disable && this.select.emit(selectedColor);
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
