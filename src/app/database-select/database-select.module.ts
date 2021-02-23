import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseSelectComponent } from './database-select.component';
import {MatButtonModule} from "@angular/material/button";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DatabaseSelectComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
  ],
  exports: [
    DatabaseSelectComponent,
  ]
})
export class DatabaseSelectModule { }
