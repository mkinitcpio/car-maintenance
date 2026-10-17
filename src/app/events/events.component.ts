import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { DetailsModule } from '@shared/components/details/details.module';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    standalone: true,
    imports: [
        DetailsModule,
        TranslateModule,
        MatIconModule,
    ],
})
export class EventsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
