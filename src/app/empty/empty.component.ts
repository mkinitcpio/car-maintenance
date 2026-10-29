import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DetailsComponent } from '@shared/components/details/details.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  standalone: true,
  imports: [
    DetailsComponent,
    EmptyStateComponent,
    TranslateModule,
  ],
})
export class EmptyComponent {

}
