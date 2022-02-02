import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { WidgetComponent } from './widget.component';

@NgModule({
  declarations: [
    WidgetComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    WidgetComponent,
  ]
})
export class WidgetModule { }
