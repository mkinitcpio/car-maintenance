import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from '@angular/material/checkbox';
import {CdkContextMenuTrigger, CdkMenu, CdkMenuItem} from '@angular/cdk/menu';

import { CellNoteComponent } from './cell-note/cell-note.component';
import { CellDateComponent } from './cell-date/cell-date.component';
import { CellTextComponent } from './cell-text/cell-text.component';
import { CellCostComponent } from './cell-cost/cell-cost.component';
import { CellMileageComponent } from './cell-mileage/cell-mileage.component';
import { TablePanelComponent } from './table-panel/table-panel.component';

export const imports = [
  CommonModule,
  TranslateModule,
  MatCheckboxModule,
  MatIconModule,
  CdkContextMenuTrigger,
  CdkMenu,
  CdkMenuItem,
  CellNoteComponent,
  CellDateComponent,
  CellTextComponent,
  CellCostComponent,
  CellMileageComponent,
  TablePanelComponent,
];
