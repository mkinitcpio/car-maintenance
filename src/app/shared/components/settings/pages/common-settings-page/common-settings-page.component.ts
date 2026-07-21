import { Component, inject, signal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { SettingComponent } from '../../setting/setting.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@shared/components/button/button.module';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { SettingsService } from '../../settings.service';
import { startPageOptions } from './start-page-options';
import { ElectronService } from '@core/services';
import { DataBaseService } from '@core/database';
import { first } from 'rxjs/operators';
import { NavigationEnum } from 'app/home/navigation-bar/navigation.enum';
import { CmLineClamp } from "@shared/directives/line-clamp/line-clamp";

@Component({
    selector: 'cm-common-settings-page',
    imports: [
    MatDivider,
    SettingComponent,
    TranslateModule,
    ButtonModule,
    MatIcon,
    MatTooltip,
    MatSelect,
    MatFormField,
    MatOption,
    CmLineClamp,
],
    templateUrl: './common-settings-page.component.html',
    styleUrl: './common-settings-page.component.scss'
})
export class CommonSettingsPageComponent {

  public startPageOptions$$ = signal(startPageOptions);

  public settingsService = inject(SettingsService);
  public electronService = inject(ElectronService);
  public dataBaseService = inject(DataBaseService);

  public onDatabaseChange(): void {
    const oldDatabasePath = this.settingsService.settings.databasePath;

    this.electronService.dialog
      .showOpenDialog({ properties: ["openFile"] })
      .then((data) => {
        if (data.filePaths.length) {
          const filePath = data.filePaths[0];

          this.dataBaseService.databaseError$.pipe(first()).subscribe(() => {
            this.settingsService.setDataBasePath(oldDatabasePath);
          });

          this.settingsService.setDataBasePath(filePath);
          this.dataBaseService.initDataBase();
        }
      });
  }

  public onStartPageChanged(navigationRoute: NavigationEnum): void {
    this.settingsService.setStartPage(navigationRoute);
  }
}
