import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseSelectComponent } from './database-select.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [DatabaseSelectComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    DatabaseSelectComponent,
  ]
})
export class DatabaseSelectModule { }
