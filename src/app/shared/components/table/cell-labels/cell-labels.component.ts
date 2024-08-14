import { Component, computed, inject, input } from '@angular/core';
import { StackItem } from '@shared/components/stack-item-list/interface';

import { StackItemListComponent } from '@shared/components/stack-item-list/stack-item-list.component';
import { DialogManagerService } from '@shared/services/dialog-manager.service';

@Component({
  standalone: true,
  selector: 'cm-cell-labels',
  templateUrl: './cell-labels.component.html',
  styleUrl: './cell-labels.component.scss',
  imports: [
    StackItemListComponent
  ],
})
export class CellLabelsComponent {

  value = input<string[]>();
  stackItemList = computed<StackItem[]>(() => {
    return this.value().map((label) => ({
      id: label,
      name: label,
    }));
  });

  private dialogManagerService = inject(DialogManagerService);

  public openLabelsDialog(): void {
    this.dialogManagerService.openLabelsDialog(this.value());
  }
}
