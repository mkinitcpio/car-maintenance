import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    standalone: true,
    imports: [
        NavigationComponent,
        RouterModule,
    ],
})
export class MaintenanceComponent {

}
