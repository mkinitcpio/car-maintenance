import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyStateComponent, EmptyStateIllustration, WrenchIllustrationComponent } from '@shared/components';
import { DetailsComponent } from '@shared/components/details/details.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.scss'],
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
export class StorageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
