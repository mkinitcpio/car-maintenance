import { Component, input, output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@shared/components/button/button.module';
import { ColumnSelectorComponent } from '../column-selector/column-selector.component';
import { ColumnSchema } from '../interfaces';
import { ColumnVisibilityEvent } from '../column-selector/interfaces';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule, NgPlural, NgPluralCase } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'cm-table-panel',
  templateUrl: './table-panel.component.html',
  styleUrl: './table-panel.component.scss',
  imports: [
    MatIconModule,
    MatRippleModule,
    ButtonModule,
    MatMenuModule,
    ColumnSelectorComponent,
    MatDividerModule,
    NgPlural,
    NgPluralCase,
    TranslateModule,
    CommonModule,
  ],
})
export class TablePanelComponent {

  columnSchemas = input<ColumnSchema[]>();
  selectedRowsCount = input<number>(0);
  hasData = input<boolean>(true);

  add = output<void>();
  move = output<void>();
  delete = output<void>();
  exportToCSV = output<void>();
  exportToPDF = output<void>();
  onVisibilityChanged = output<ColumnVisibilityEvent>();

}
