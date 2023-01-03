import {
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { ColorEnum } from "../settings/colors-enum";

interface Color {
  name: string;
  color: ColorEnum;
}

@Component({
  selector: "app-color-selector",
  templateUrl: "./color-selector.component.html",
  styleUrls: ["./color-selector.component.scss"],
})
export class ColorSelectorComponent {

  @Input()
  selected: string;

  @Input()
  colors: Color[];

  @Output()
  select: EventEmitter<string> = new EventEmitter();

  @Output()
  setDefault: EventEmitter<string> = new EventEmitter();

  public ColorEnum = ColorEnum;

  public onSelected(selectedColor: ColorEnum): void {
    this.select.emit(selectedColor);
  }

  public onSystemColorToggle(checked: boolean): void {
    const selectedColor = checked ? ColorEnum.Blue : ColorEnum.Default;
    this.select.emit(selectedColor);
  }
}
