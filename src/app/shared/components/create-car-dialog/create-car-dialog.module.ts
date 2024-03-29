import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCarDialogComponent } from './create-car-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UbuntuContainerModule } from '@shared/ubuntu/ubuntu-container/ubuntu-container.module';
import { DialogModule } from '../dialog/dialog.module';
import { ButtonModule } from '../button/button.module';
import { ContentContainerModule } from '../content-container/content-container.module';
import { TabsModule } from '../tabs/tabs.module';



@NgModule({
  declarations: [
    CreateCarDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
    UbuntuContainerModule,
    DialogModule,
    ButtonModule,
    ContentContainerModule,
    TabsModule,
  ]
})
export class CreateCarDialogModule { }
