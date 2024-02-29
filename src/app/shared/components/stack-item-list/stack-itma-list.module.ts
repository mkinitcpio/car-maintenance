import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackItemListComponent } from './stack-item-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    StackItemListComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    TranslateModule,
    MatRippleModule,
  ],
  exports: [
    StackItemListComponent,
  ]
})
export class StackItemListModule { }
