import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { StatsService } from '../services/stats.service';
import { DetailsComponent } from "@shared/components/details/details.component";
import { BarChart } from "@shared/components/charts/bar-chart/bar-chart";
import { CmButton } from "@shared/components/button/button";
import { MatIcon } from "@angular/material/icon";
import { CmTextBody } from "@shared/components/typography/text-body/text-body";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-maintenance",
  templateUrl: "./maintenance.home.html",
  styleUrls: ["./maintenance.home.scss"],
  imports: [
    DetailsComponent,
    BarChart,
    CmButton,
    MatIcon,
    CmTextBody,
  ],
})
export class MaintenanceHome {

  private statsService = inject(StatsService);

  public years = signal<string[]>([]);
  public selectedYearIndex = signal<number>(0);

  ngOnInit() {
    this.statsService.getCostByMonthData().then((data) => {
      const currentYear = (new Date()).getFullYear();

      this.years.set(Object.keys(data));
      this.selectedYearIndex.set(this.years().findIndex((year) => +year === currentYear));
      console.log(this.years(), this.selectedYearIndex());
    });
  }

  public prevYear(): void {
    this.selectedYearIndex.update((value) => value - 1);
  }

  public nextYear(): void {
    this.selectedYearIndex.update((value) => value + 1);
  }
}
