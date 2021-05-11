import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabaseSelectModule } from '../database-select/database-select.module';
import { TranslateModule } from '@ngx-translate/core';

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
  ],
  exports: [
    WelcomePageComponent,
  ]
})
export class WelcomePageModule { }
