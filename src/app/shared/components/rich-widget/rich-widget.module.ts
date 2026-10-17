import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichWidgetComponent } from './rich-widget.component';
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyModule } from '@shared/currency/currency.module';
import { LocalizedDatePipe } from '@shared/pipes/localized-date.pipe';
import { NumberSeparatorPipe } from '@shared/pipes/number-separator.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CmTextBody } from "../typography/text-body/text-body";

@NgModule({
  declarations: [
    RichWidgetComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    CurrencyModule,
    LocalizedDatePipe,
    NumberSeparatorPipe,
    MatTooltipModule,
    CmTextBody,
],
  exports: [
    RichWidgetComponent,
  ]
})
export class RichWidgetModule { }
