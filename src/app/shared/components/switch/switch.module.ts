import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch.component';

@NgModule({
  declarations: [
    SwitchComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SwitchComponent,
  ]
})
export class SwitchModule { }
