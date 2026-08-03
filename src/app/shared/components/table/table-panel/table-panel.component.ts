import { Component, input, output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@shared/components/button/button.module';
import { ColumnSelectorComponent } from '../column-selector/column-selector.component';
import { ColumnSchema } from '../interfaces';
import { ColumnVisibilityEvent } from '../column-selector/interfaces';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { CmTextHeader } from "@shared/components/typography/text-header/text-header";
import { CmTextBody } from "@shared/components/typography/text-body/text-body";
import { CmButton } from "@shared/components/button/button";

@Component({
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
    TranslateModule,
    CmTextHeader,
    CmTextBody,
    CmButton
]
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
