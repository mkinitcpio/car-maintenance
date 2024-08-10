import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@shared/components/button/button.module';
import { ColumnSelectorComponent } from '../column-selector/column-selector.component';
import { ColumnSchema } from '../interfaces';
import { ColumnVisibilityEvent } from '../column-selector/interfaces';
import { MatDividerModule } from '@angular/material/divider';
import { NgPlural, NgPluralCase } from '@angular/common';
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
  ],
})
export class TablePanelComponent {

  @Input() columnSchemas: ColumnSchema[];
  @Input() selectedRowsCount: number;

  @Output() add: EventEmitter<void> = new EventEmitter();
  @Output() move: EventEmitter<void> = new EventEmitter();
  @Output() onVisibilityChanged: EventEmitter<ColumnVisibilityEvent> = new EventEmitter();
  @Output() exportToCSV: EventEmitter<void> = new EventEmitter();
  @Output() exportToPDF: EventEmitter<void> = new EventEmitter();

}
