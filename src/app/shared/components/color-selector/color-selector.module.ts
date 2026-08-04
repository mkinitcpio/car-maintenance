import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSelectorComponent } from './color-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { ColorsModule } from './colors/colors.module';
import { SwitchComponent } from '../switch/switch.component';

@NgModule({
  declarations: [ColorSelectorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    ColorsModule,
    SwitchComponent,
  ],
  exports: [
    ColorSelectorComponent,
  ]
})
export class ColorSelectorModule { }
