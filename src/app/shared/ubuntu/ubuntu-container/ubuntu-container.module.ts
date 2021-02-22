import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbuntuContainerComponent } from './ubuntu-container.component';

@NgModule({
  declarations: [UbuntuContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UbuntuContainerComponent,
  ]
})
export class UbuntuContainerModule { }
