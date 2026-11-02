import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ColorEnum } from '@shared/components/settings/colors-enum';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss'],
    imports: [MatIconModule]
})
export class ColorComponent {
  color = input<ColorEnum>();

  selected = input<boolean>();
}
