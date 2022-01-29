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
import { UbuntuCloseButtonModule } from '@shared/ubuntu/ubuntu-close-button/ubuntu-close-button.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UbuntuContainerModule } from '@shared/ubuntu/ubuntu-container/ubuntu-container.module';



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
    UbuntuCloseButtonModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
    UbuntuContainerModule,
    MatIconModule,
  ]
})
export class CreateCarDialogModule { }
