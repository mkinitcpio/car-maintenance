import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UbuntuCloseButtonModule } from '../../ubuntu/ubuntu-close-button/ubuntu-close-button.module';
import { UbuntuContainerModule } from '../../ubuntu/ubuntu-container/ubuntu-container.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    UbuntuCloseButtonModule,
    UbuntuContainerModule,
  ],
  exports: [
    SettingsComponent,
  ],
})
export class SettingsModule { }
