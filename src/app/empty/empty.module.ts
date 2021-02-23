import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [EmptyComponent],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
  ],
  exports: [
    EmptyComponent,
  ]
})
export class EmptyModule { }
