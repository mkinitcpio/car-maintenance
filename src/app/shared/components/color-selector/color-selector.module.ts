import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ColorSelectorComponent} from './color-selector.component'
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ColorSelectorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
  ],
  exports:[ColorSelectorComponent]
})
export class ColorSelectorModule { }
