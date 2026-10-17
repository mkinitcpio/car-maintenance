import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ColorEnum } from '@shared/components/settings/colors-enum';

@Component({
    selector: 'app-color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss'],
    imports: [MatIconModule]
})
export class ColorComponent {
  @Input()
  color: ColorEnum;

  @Input()
  selected: boolean;
}
