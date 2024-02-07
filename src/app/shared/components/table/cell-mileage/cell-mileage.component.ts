import { Component, Input, inject } from '@angular/core';
import { MileageComponent } from '@shared/components/mileage/mileage.component';
import { SettingsService } from '@shared/components/settings/settings.service';
import { CommonPipesModule } from '@shared/pipes/common-pipes.module';

@Component({
  standalone: true,
  selector: 'cm-cell-mileage',
  templateUrl: './cell-mileage.component.html',
  styleUrl: './cell-mileage.component.scss',
  imports: [
    CommonPipesModule,
    MileageComponent,
  ],
})
export class CellMileageComponent {

  @Input() value: number;

  public settingsService = inject(SettingsService);

}
