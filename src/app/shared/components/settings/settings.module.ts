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

@NgModule({
  declarations: [SettingsComponent],
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
    MatSlideToggleModule,
  ],
  providers: [
    SettingsService,
  ],
  exports: [
    SettingsComponent,
  ],
})
export class SettingsModule { }
