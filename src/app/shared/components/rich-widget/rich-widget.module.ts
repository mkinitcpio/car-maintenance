import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichWidgetComponent } from './rich-widget.component';
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyModule } from '@shared/currency/currency.module';
import { CommonPipesModule } from '@shared/pipes/common-pipes.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    RichWidgetComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    CurrencyModule,
    CommonPipesModule,
    MatTooltipModule,
  ],
  exports: [
    RichWidgetComponent,
  ]
})
export class RichWidgetModule { }
