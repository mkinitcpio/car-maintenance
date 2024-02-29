import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, combineLatest, merge } from 'rxjs';

import { DetailsFacade } from './state/details.facade';
import { Record } from './state/interface';

import { FormModeEnum } from '@shared/components/create-dialog/form-mode.enum';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { SettingsService } from '@shared/components/settings/settings.service';
import { CurrencyEnum } from '@shared/components/settings/currency.enum';
import { currencies } from '@shared/pipes/currencies';

import { listen } from '@core/decorators';
import { AutoCloseable } from '@core/auto-closeable';
import { GroupData, GroupTreeService } from 'app/navigation/categories-tree/group-tree.service';
import { ExportService } from '@shared/services/export.service';
import { NavigationFacade } from 'app/navigation/state/navigation.facade';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { CategoryTree } from 'app/navigation/state/interface';

import { stateValue } from '@core/rx-operators';
import { MoveToItem } from '@shared/components/move-dialog/interfaces';
import { TableComponent } from '@shared/components/table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { DetailsModule } from '@shared/components/details/details.module';
import { ButtonModule } from '@shared/components/button/button.module';
import { RichWidgetModule } from '@shared/components/rich-widget/rich-widget.module';
import { MatMenuModule } from '@angular/material/menu';
import { defaultTableConfig } from '@shared/components/table/default-table-config';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ElectronService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';

import { columnSchemas } from './detail-table-column-schema.config';
import { UtilsService } from '@shared/services/utils.service';
import { ColumnSchema } from '@shared/components/table/interfaces';

const imports = [
  TableComponent,
  DetailsModule,
  ButtonModule,
  MatIconModule,
  RichWidgetModule,
  MatMenuModule,
];

@Component({
  standalone: true,
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports,
})
export class DetailComponent extends AutoCloseable implements OnInit {

  @listen({ value: true })
    details$ = this.detailsFacade.details$;

  @listen()
    newDetails$ = this.detailsFacade.newDetails$;

  @listen()
    detailChanges$ = merge(
      this.detailsFacade.editDetail$,
      this.detailsFacade.newDetails$,
      this.detailsFacade.deleteDetail$,
      this.detailsFacade.moveRecords$,
    );

  public parentId: string = null;
  public id: string = null;
  public dataSourceTable: Record[] = [];
  public name: string = null;
  public costSum = 0;
  public lastModifiedDate: Date = null;
  public currencies = currencies;

  public CurrencyEnum = CurrencyEnum;

  public tableConfig = {...defaultTableConfig};

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
  ) {
    super();
    this.tableConfig.actions.selectable = true;
    this.tableConfig.panel = true;
    this.tableConfig.columnSchemas = this.updateVisibilityOfColumns(columnSchemas);
  }

  ngOnInit(): void {
    this.details$.subscribe((categoryDetails) => {
      this.dataSourceTable = categoryDetails;
      this.costSum = this.utilsService.getResultCost(this.dataSourceTable);
      this.lastModifiedDate = this.utilsService.getLastDate(this.dataSourceTable);
    });

    this.route.params.subscribe((params) => {
      this.parentId = params['parentId'];
      this.id = params['id'];
      this.name = params['name'];
      this.detailsFacade.loadRecords(this.id);
    });

    this.detailChanges$.subscribe(() => {
      this.detailsFacade.loadRecords(this.id);
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
      formData: this.dataSourceTable.find(row => row.id === id),
    };

    this.dialogManagerService
      .openRecordDialog(data)
      .subscribe((record: Record) => {
        this.detailsFacade.editRecord(record);
      });
  }

  public onDelete(record: Record): void {
    this.dialogManagerService
      .openDeleteRecordDialog(record.name)
      .subscribe(() => {
        this.detailsFacade.deleteRecord(record.id);
      });
  }

  public onExportToPDF(): void {
    this.dialogManagerService
      .openPrintDialog({
        multiply: false,
        tablesData: [{
          title: this.name,
          records: this.dataSourceTable,
          totalCost: this.utilsService.getResultCost(this.dataSourceTable),
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
    const defaultFileName = `${this.name}.csv`;

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
        switchMap((moveToItems) => this.dialogManagerService.openMoveDialog({ moveToItems })),
        filter(Boolean),
      )
      .subscribe((parentId: string) => {
        this.detailsFacade.moveRecords(parentId, recordIds);
      });
  }

  public onColumnVisibilityChanged(hiddenColumns: string[]): void {
    this.settingsService.setVisibleColumnsForDetailsTable(hiddenColumns);
    this.tableConfig.columnSchemas = this.updateVisibilityOfColumns(columnSchemas);
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
