import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabaseSelectModule } from '../database-select/database-select.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@shared/components/button/button.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    WelcomePageComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    DatabaseSelectModule,
    BrowserAnimationsModule,
    ButtonModule,
    MatTooltipModule,
  ],
  exports: [
    WelcomePageComponent,
  ]
})
export class WelcomePageModule { }
