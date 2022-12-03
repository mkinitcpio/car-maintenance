import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatBadgeModule,
  ],
  exports: [
    TabsComponent,
  ]
})
export class TabsModule { }
