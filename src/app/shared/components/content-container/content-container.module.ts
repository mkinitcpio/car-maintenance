import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentContainerComponent } from './content-container.component';

@NgModule({
  declarations: [
    ContentContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContentContainerComponent,
  ],
})
export class ContentContainerModule { }
