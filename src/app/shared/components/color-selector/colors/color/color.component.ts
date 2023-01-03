import { Component, Input } from '@angular/core';
import { ColorEnum } from '@shared/components/settings/colors-enum';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent {
  @Input()
  color: ColorEnum;

  @Input()
  selected: boolean;
}
