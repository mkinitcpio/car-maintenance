import { ChangeDetectionStrategy, Component,
  input,
  output, } from "@angular/core";
import { SwitchComponent } from '../switch/switch.component';
import { ColorsComponent } from './colors/colors.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ColorEnum } from "../settings/colors-enum";

interface Color {
  name: string;
  color: ColorEnum;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-color-selector",
    templateUrl: "./color-selector.component.html",
    styleUrls: ["./color-selector.component.scss"],
    imports: [
        CommonModule,
        MatIconModule,
        TranslateModule,
        ColorsComponent,
        SwitchComponent,
    ]
})
export class ColorSelectorComponent {

  selected = input<string>();

  colors = input<Color[]>();

  select = output<string>();

  setDefault = output<string>();

  public ColorEnum = ColorEnum;

  public onSelected(selectedColor: ColorEnum): void {
    this.select.emit(selectedColor);
  }

  public onSystemColorToggle(checked: boolean): void {
    const selectedColor = checked ? ColorEnum.Blue : ColorEnum.Default;
    this.select.emit(selectedColor);
  }
}
