import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintDialogComponent } from './print-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PreviewPageComponent } from './preview-page/preview-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CommonPipesModule } from '../../pipes/common-pipes.module';
import { UbuntuContainerModule } from '../../ubuntu/ubuntu-container/ubuntu-container.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonModule } from '../button/button.module';
import { ContentContainerModule } from '../content-container/content-container.module';
import { CmButton } from '../button/button';
import { CmCheckbox } from '../checkbox/checkbox';
import { SwitchComponent } from '../switch/switch.component';
import { DialogModule } from '../dialog/dialog.module';
import { CurrencyModule } from '../../currency/currency.module';
import { CmTextBody } from "../typography/text-body/text-body";

@NgModule({
  declarations: [
    PrintDialogComponent,
    PreviewPageComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatDividerModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatTableModule,
    CommonPipesModule,
    UbuntuContainerModule,
    MatTooltipModule,
    MatSlideToggleModule,
    ButtonModule,
    ContentContainerModule,
    CmButton,
    CmCheckbox,
    SwitchComponent,
    DialogModule,
    CmTextBody,
    CurrencyModule
],
  exports: [
    PrintDialogComponent,
  ]
})
export class PrintDialogModule { }
