import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { DetailsModule } from '@shared/components/details/details.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    DetailsModule,
    TranslateModule,
    MatIconModule,
  ]
})
export class EventsModule { }
