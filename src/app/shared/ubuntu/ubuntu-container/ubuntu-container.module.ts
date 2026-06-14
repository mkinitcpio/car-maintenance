import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbuntuContainerComponent } from './ubuntu-container.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    UbuntuContainerComponent,
  ],
  exports: [
    UbuntuContainerComponent,
  ]
})
export class UbuntuContainerModule { }
