import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, combineLatest, merge } from 'rxjs';

import { DetailsFacade } from './state/details.facade';
import { Record } from './state/interface';

import { FormModeEnum } from '../dialogs/create-dialog/form-mode.enum';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { SettingsService } from '@shared/components/settings/settings.service';
import { CurrencyEnum } from '@shared/components/settings/currency.enum';
import { currencies } from '@shared/pipes/currencies';

import { listen } from '@core/decorators';
import { AutoCloseable } from '@core/auto-closeable';
import { GroupData, GroupTreeService } from 'app/maintenance/navigation/categories-tree/group-tree.service';
import { ExportService } from '@shared/services/export.service';
import { NavigationFacade } from 'app/maintenance/navigation/state/navigation.facade';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { CategoryTree, Category, CategoryTypeEnum } from 'app/maintenance/navigation/state/interface';

import { stateValue } from '@core/rx-operators';
import { MoveToItem } from '../dialogs/move-dialog/interfaces';
import { TableComponent } from '@shared/components/table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from '@shared/components/details/details.component';
import { MatMenuModule } from '@angular/material/menu';
import { defaultTableConfig } from '@shared/components/table/default-table-config';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ElectronService } from '@core/services';

import { columnSchemas } from './detail-table-column-schema.config';
import { UtilsService } from '@shared/services/utils.service';
import { ColumnSchema, TableConfig } from '@shared/components/table/interfaces';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WidgetsPanel } from '@shared/components/widgets-panel/widgets-panel';
import { Widget } from '@shared/components/widgets-panel/interface';
import { CmButton } from "@shared/components/button/button";
import { ActionsPanel } from "@shared/components/actions-panel/actions-panel";
import { CmTextBody } from '@shared/components/typography/text-body/text-body';
import { CategoryManagementService } from '@shared/services/category-management.service';

const imports = [
  TableComponent,
  DetailsComponent,
  MatIconModule,
  MatMenuModule,
  WidgetsPanel,
  CmButton,
  ActionsPanel,
  TranslateModule,
  CmTextBody,
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports,
})
export class DetailComponent extends AutoCloseable implements OnInit {

  @listen({ value: true })
    details$ = this.detailsFacade.details$;

  @listen({ value: true })
    editCategory$ = this.navigationFacade.editCategory$;

  @listen({ value: true })
    deleteCategory$ = this.navigationFacade.deleteCategory$;

  @listen()
    newDetails$ = this.detailsFacade.newDetails$;

  @listen()
    detailChanges$ = merge(
      this.detailsFacade.editDetail$,
      this.detailsFacade.newDetails$,
      this.detailsFacade.deleteDetail$,
      this.detailsFacade.moveRecords$,
    );

  public parentId = signal<string>(null);
  public id: string = null;
  public dataSourceTable = signal<Record[]>([]);
  public name = signal<string>(null);
  public currencies = currencies;

  public costSum = signal<number>(0);
  public lastModifiedDate = signal<Date | null>(null);

  public widgets = computed<Widget[]>(() => {
    const widgets: Widget[] = [{
      title: 'PAGES.DETAIL.OVERALL_EXPENSE',
      type: 'currency',
      transparent: true,
      icon: 'money',
      value: this.costSum(),
      orientation: 'vertical',
    }, {
      title: 'PAGES.DETAIL.LAST_MODIFIED',
      type: 'date',
      transparent: true,
      icon: 'calendar-edit',
      value: this.lastModifiedDate(),
    }];

    return widgets;
  });

  public CurrencyEnum = CurrencyEnum;

  public tableConfig = signal<TableConfig>({...defaultTableConfig});

  private electronService: ElectronService = inject(ElectronService);
  private translateService: TranslateService = inject(TranslateService);
  private exportService: ExportService = inject(ExportService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private utilsService: UtilsService = inject(UtilsService);

  private exportTranslatedText: [text: string, action: string];

  constructor(
    private route: ActivatedRoute,
    private detailsFacade: DetailsFacade,
    public settingsService: SettingsService,
    private dialogManagerService: DialogManagerService,
    private groupTreeService: GroupTreeService,
    private navigationFacade: NavigationFacade,
    private categoryManagementService: CategoryManagementService,
  ) {
    super();
    this.tableConfig.set({
      ...this.tableConfig(),
      actions: { ...this.tableConfig().actions, selectable: true },
      panel: true,
      columnSchemas: this.updateVisibilityOfColumns(columnSchemas),
    });
  }

  ngOnInit(): void {
    this.details$.subscribe((categoryDetails: Record[]) => {
      this.dataSourceTable.set(categoryDetails);
      this.costSum.set(this.utilsService.getResultCost(categoryDetails));
      this.lastModifiedDate.set(this.utilsService.getLastDate(categoryDetails));
    });

    this.route.params.subscribe((params) => {
      this.parentId.set(params['parentId'] as string);
      this.id = params['id'] as string;
      this.name.set(params['name'] as string);
      this.detailsFacade.loadRecords(this.id);
    });

    this.detailChanges$.subscribe(() => {
      this.detailsFacade.loadRecords(this.id);
    });

    this.editCategory$.subscribe((category: Category) => {
      if (category.id === this.id) {
        this.name.set(category.name);
        this.parentId.set(category.parent);
      }
    });

    this.deleteCategory$.subscribe((category: Category) => {
      if (category.id === this.id) {
        this.navigateToParentGroup(this.parentId());
      }
    });

    this.getExportTranslatedText()
      .pipe(take(1))
      .subscribe((translatedText) => this.exportTranslatedText = translatedText);
  }

  public onCreate(): void {
    const data = {
      mode: FormModeEnum.Create,
      parent: this.id,
    };

    this.dialogManagerService
      .openRecordDialog(data)
      .subscribe((record: Record) => {
        this.detailsFacade.createNewRecord(record);
      });
  }

  public onEdit(id: string): void {
    const data = {
      mode: FormModeEnum.Edit,
      parent: this.id,
      formData: this.dataSourceTable().find(row => row.id === id),
    };

    this.dialogManagerService
      .openRecordDialog(data)
      .subscribe((record: Record) => {
        this.detailsFacade.editRecord(record);
      });
  }

  public onDelete(rowIds: string[]): void {
    this.utilsService.getDeclensionWord("DIALOG.DELETE.DECLESIONS.RECORDS", rowIds.length)
      .pipe(
        take(1),
        switchMap((translation) => {
          return this.dialogManagerService.openDeleteRecordDialog({ name: `${rowIds.length} ${translation}` });
        })
      )
      .subscribe(() => {
        this.detailsFacade.deleteRecord(rowIds);
      });
  }

  public onEditCategory(): void {
    this.categoryManagementService.editCategory(this.getCategoryForAction());
  }

  public onDeleteCategory(): void {
    this.categoryManagementService.deleteCategory(this.getCategoryForAction());
  }

  private getCategoryForAction(): Category {
    return {
      id: this.id,
      name: this.name(),
      parent: this.parentId(),
      type: CategoryTypeEnum.Category,
    };
  }

  public onExportToPDF(): void {
    this.dialogManagerService
      .openPrintDialog({
        multiply: false,
        columns: this.updateVisibilityOfColumns(columnSchemas),
        tablesData: [{
          title: this.name(),
          records: this.dataSourceTable(),
          totalCost: this.utilsService.getResultCost(this.dataSourceTable()),
        }],
      })
      .subscribe((saveData) => {
        if(saveData?.status === "Success") {
          const [text, action] = this.exportTranslatedText;
          this.snackBar.open('');
          this.snackBar
            .open(text, action, {duration: 4000})
            .onAction()
            .subscribe(() => {
              this.electronService.shell.openPath(saveData.filePath);
            });
        }
      });
  }

  public navigateToParentGroup(id: string): void {
    const groupData: GroupData = {
      routeName: 'category-details',
      group: { id },
    };

    this.groupTreeService.selectedItem(groupData);
  }

  public onExportCSV(data: string[][]): void {
    const defaultFileName = `${this.name()}.csv`;

    this.exportService.toCSV(data, defaultFileName)
      .subscribe((saveData) => {
        if(saveData?.status === "Success") {
          const [text, action] = this.exportTranslatedText;
          this.snackBar
            .open(text, action, {duration: 4000})
            .onAction()
            .subscribe(() => {
              this.electronService.shell.openPath(saveData.filePath);
            });
        }
      });
  }

  public onMove(recordIds: string[]): void {
    this.navigationFacade.categories$
      .pipe(
        take(1),
        stateValue<CategoryTree[]>,
        map((groups) => this.getMoveToItems(groups)),
        switchMap((moveToItems) => this.dialogManagerService.openMoveDialog({ parent: this.id, moveToItems })),
        filter(Boolean),
      )
      .subscribe((parentId: string) => {
        this.detailsFacade.moveRecords(parentId, recordIds);
      });
  }

  public onColumnVisibilityChanged(hiddenColumns: string[]): void {
    this.settingsService.setVisibleColumnsForDetailsTable(hiddenColumns);
    this.tableConfig.update(config => ({
      ...config,
      columnSchemas: this.updateVisibilityOfColumns(columnSchemas),
    }));
  }

  private getMoveToItems(groups: CategoryTree[]): MoveToItem[] {
    const subGroups = groups.map(group => group.children || []).flat(1);

    return subGroups.map(subGroup => {
      const parent = groups.find(group => group.id === subGroup.parent);
      return {
        id: subGroup.id,
        name: subGroup.name,
        icon: `illustrations:${(subGroup.illustration?.replace('.svg', '') || 'wrench')}`,
        group: parent.name,
      } as MoveToItem;
    });
  }

  private getExportTranslatedText(): Observable<[string, string]> {
    return combineLatest([
      this.translateService.get("NOTIFICATIONS.EXPORT.TEXT"),
      this.translateService.get("NOTIFICATIONS.EXPORT.ACTION"),
    ]);
  }

  public updateVisibilityOfColumns(schemas: ColumnSchema[]): ColumnSchema[] {
    const hiddenColumns = this.settingsService.getDetailsHiddenVisibleColumns();

    return schemas.map((schema) => {
      schema.visible = !hiddenColumns.includes(schema.key);
      return schema;
    });
  }
}
