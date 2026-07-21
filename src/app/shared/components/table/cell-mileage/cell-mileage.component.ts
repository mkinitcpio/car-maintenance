import { Component, inject, ChangeDetectionStrategy, input } from '@angular/core';
import { MileageComponent } from '@shared/components/mileage/mileage.component';
import { SettingsService } from '@shared/components/settings/settings.service';
import { CommonPipesModule } from '@shared/pipes/common-pipes.module';
import { CmTextBody } from "@shared/components/typography/text-body/text-body";

@Component({
  selector: 'cm-cell-mileage',
  templateUrl: './cell-mileage.component.html',
  styleUrl: './cell-mileage.component.scss',
  imports: [
    CommonPipesModule,
    MileageComponent,
    CmTextBody,
  ],
})
export class CellMileageComponent {

  readonly value = input<number>();

  public settingsService = inject(SettingsService);

}
