import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    TabsComponent,
  ]
})
export class TabsModule { }
