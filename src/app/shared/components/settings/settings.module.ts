import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsService } from './settings.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ColorSelectorModule} from '../color-selector/color-selector.module';
import { DialogModule } from '../dialog/dialog.module';
import { SwitchComponent } from '../switch/switch.component';
import { SettingComponent } from './setting/setting.component';
import { ButtonModule } from '../button/button.module';
import { ContentContainerModule } from '../content-container/content-container.module';
import { CommonPipesModule } from '@shared/pipes/common-pipes.module';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import {
  AboutSettingsPageComponent,
  CommonSettingsPageComponent,
  ContactsSettingsPageComponent,
  LanguageSettingsPageComponent,
  UnitsSettingsPageComponent,
  CurrencySettingsPageComponent,
  AppearanceSettingsPageComponent,
} from './pages';
import { CmTextBody } from "../typography/text-body/text-body";
import { CmTextHeader } from "../typography/text-header/text-header";

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    ColorSelectorModule,
    DialogModule,
    SwitchComponent,
    ButtonModule,
    ContentContainerModule,
    CommonPipesModule,
    MatRippleModule,
    MatSidenavModule,
    ContactsSettingsPageComponent,
    UnitsSettingsPageComponent,
    CommonSettingsPageComponent,
    LanguageSettingsPageComponent,
    AboutSettingsPageComponent,
    SettingComponent,
    CurrencySettingsPageComponent,
    AppearanceSettingsPageComponent,
    CmTextBody,
    CmTextHeader,
],
  providers: [
    SettingsService,
  ],
  exports: [
    SettingsComponent,
  ],
})
export class SettingsModule { }
