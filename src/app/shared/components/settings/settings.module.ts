import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UbuntuCloseButtonModule } from '../../ubuntu/ubuntu-close-button/ubuntu-close-button.module';
import { UbuntuContainerModule } from '../../ubuntu/ubuntu-container/ubuntu-container.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsService } from './settings.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ColorSelectorModule} from '../color-selector/color-selector.module';
import { DialogModule } from '../dialog/dialog.module';
import { SwitchModule } from '../switch/switch.module';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [SettingsComponent, SettingComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    UbuntuCloseButtonModule,
    UbuntuContainerModule,
    TranslateModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    ColorSelectorModule,
    DialogModule,
    SwitchModule,
  ],
  providers: [
    SettingsService,
  ],
  exports: [
    SettingsComponent,
  ],
})
export class SettingsModule { }
