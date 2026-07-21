import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentContainerComponent } from './content-container.component';
import { CmTextHeader } from "../typography/text-header/text-header";

@NgModule({
  declarations: [
    ContentContainerComponent
  ],
  imports: [
    CommonModule,
    CmTextHeader,
],
  exports: [
    ContentContainerComponent,
  ],
})
export class ContentContainerModule { }
