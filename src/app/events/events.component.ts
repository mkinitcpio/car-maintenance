import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { DetailsComponent } from '@shared/components/details/details.component';
import { EmptyStateComponent, EmptyStateIllustration, WrenchIllustrationComponent } from '@shared/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true,
  imports: [
    DetailsComponent,
    TranslateModule,
    MatIconModule,
    EmptyStateComponent,
    WrenchIllustrationComponent,
    EmptyStateIllustration
  ],
})
export class EventsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
