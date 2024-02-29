import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryTree, CategoryTypeEnum } from '../navigation/state/interface';
import { CategoryDetailsFacade } from './state/category-details.facade';
import { CategoryDetails } from './state/interface';
import { Record } from '../detail/state/interface';
import { FormModeEnum } from '../shared/components/create-dialog/form-mode.enum';
import { DetailsFacade } from '../detail/state/details.facade';
import { DialogManagerService } from '../shared/services/dialog-manager.service';
import { NavigationFacade } from '../navigation/state/navigation.facade';
import { listen } from '../core/decorators';
import { Observable, combineLatest, delay, filter, merge, take, timer } from 'rxjs';
import { AutoCloseable } from '../core/auto-closeable';
import { UtilsService } from '@shared/services/utils.service';
import { SettingsService } from '@shared/components/settings/settings.service';
import { ElectronService } from '@core/services';
import { MetricSystemEnum } from '@shared/components/settings/metric-system.enum';
import { GroupData, GroupTreeService } from 'app/navigation/categories-tree/group-tree.service';
import { defaultTableConfig } from '@shared/components/table/default-table-config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent extends AutoCloseable implements OnInit {

  @listen({ value: true })
    categoryDetails$ = this.categoryDetailsFacade.categoryDetails$;

  @listen({ value: true })
    records$ = this.detailsFacade.details$;

  @listen({ value: true })
    deleteCategory$ = merge(
      this.navigationFacade.deleteCategory$,
      this.navigationFacade.deleteCarCategory$,
    );

  @listen({ value: true })
    updatedMaintenance$ = this.categoryDetailsFacade.updatedMaintenance$;

  @listen()
    recordChanges$ = merge(
      this.detailsFacade.newDetails$,
      this.detailsFacade.editDetail$,
      this.detailsFacade.deleteDetail$,
    );

  @listen({ value: true })
    categoryChanges$ = merge(
      this.navigationFacade.newCategory$,
      this.navigationFacade.editCategory$,
      this.navigationFacade.newCarCategory$,
      this.navigationFacade.editCarCategory$,
    );

  public CategoryTypeEnum = CategoryTypeEnum;
  public MetricSystemEnum = MetricSystemEnum;

  public expandPanelToggles: Array<boolean>;
  public expandRecordsPanel = false;

  public allExpandButtonState = 'expand';

  public id: string;
  public category: CategoryTree;
  public categoryDetails: CategoryDetails;
  public records: Record[] = [];
  public totalCost: number;

  public tableConfig = defaultTableConfig;
  private exportTranslatedText: [text: string, action: string];

  private snackBar = inject(MatSnackBar);
  private electronService = inject(ElectronService);
  private translateService: TranslateService = inject(TranslateService);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilsSerivce: UtilsService,
    private detailsFacade: DetailsFacade,
    public settingsService: SettingsService,
    private navigationFacade: NavigationFacade,
    private dialogManagerService: DialogManagerService,
    private categoryDetailsFacade: CategoryDetailsFacade,
    private groupTreeService: GroupTreeService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.categoryDetails$.subscribe((categoryDetails) => {
      this.categoryDetails = categoryDetails;
      this.expandPanelToggles = Array.from({length: this.categoryDetails.tables.length}, () => false);

      this.totalCost = this.categoryDetails.tables.map(table => this.utilsSerivce.getResultCost(table.data)).reduce((acc, cur) => acc + cur, 0);
      this.tableConfig = {...this.tableConfig};
      this.tableConfig.actions.selectable = false;
      this.tableConfig.columnSchemas = [{
        key: 'name',
        name: 'RECORDS_TABLE.NAME',
        type: 'text',
        order: 1,
        visible: true,
      },{
        key: 'cost',
        name: 'RECORDS_TABLE.EXPENSE',
        type: 'cost',
        order: 2,
        visible: true,
      },{
        key: 'mileage',
        name: 'RECORDS_TABLE.MILEAGE',
        type: 'mileage',
        order: 3,
        visible: true,
      },{
        key: 'date',
        name: 'RECORDS_TABLE.DATE',
        type: 'date',
        order: 5,
        visible: true,
      },{
        key: 'notes',
        name: 'RECORDS_TABLE.COMMENT',
        type: 'note',
        order: 6,
        visible: true,
      }];
    });

    this.recordChanges$.subscribe(() => {
      this.categoryDetailsFacade.loadCategoryDetails(this.id);
    });

    this.categoryChanges$.subscribe((category) => {
      if(category.parent === this.id || this.id === category.id) {
        this.categoryDetailsFacade.loadCategoryDetails(this.id);
      }
    });

    this.updatedMaintenance$.subscribe(() => {
      this.categoryDetailsFacade.loadCategoryDetails(this.id);
    });

    this.deleteCategory$.subscribe((category) => {
      if(this.id === category.id) {
        this.router.navigate(['maintenance']);
      }

      if(this.id === category.parent) {
        this.categoryDetailsFacade.loadCategoryDetails(this.id);
      }
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.categoryDetailsFacade.loadCategoryDetails(this.id);
    });

    this.getExportTranslatedText()
      .pipe(take(1))
      .subscribe((translatedText) => this.exportTranslatedText = translatedText);
  }

  public onAddGroup(): void {
    const data = {
      mode: FormModeEnum.Create,
      parentId: this.id,
    };

    this.dialogManagerService
      .openCategoryDialog(data)
      .subscribe((group) => {
        this.navigationFacade.createNewCategory(group);
      });
  }

  public onAddRecord(): void {
    const data = {
      mode: FormModeEnum.Create,
      parent: this.id,
    };

    this.dialogManagerService
      .openRecordDialog(data)
      .subscribe((record) => {
        this.detailsFacade.createNewRecord(record);
      });
  }

  public onEdit(id: string): void {
    const data = {
      mode: FormModeEnum.Edit,
      parent: this.id,
      formData: this.findRecord(id),
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

  public onPrint(): void {
    const tablesData = this.categoryDetails.tables
      .map(table => ({
        title: table.name,
        records: table.data,
        totalCost: this.utilsSerivce.getResultCost(table.data),
      }));

    this.dialogManagerService.openPrintDialog({
      title: this.categoryDetails.data.name,
      multiply: true,
      tablesData,
    }).pipe(
      filter((data) => !!data?.filePath),
    ).subscribe(saveData => {
      if(saveData?.status === "Success") {
        const [text, action] = this.exportTranslatedText;

        this.snackBar.open('');
        this.snackBar.open(text, action, { duration: 4000 })
          .onAction()
          .subscribe(() => {
            this.electronService.shell.openPath(saveData.filePath);
          });
      }
    });
  }

  public onTextAreaFocusOut(note: string): void {
    const maintenance = {...this.categoryDetails.maintenance};

    maintenance.note = note;
    this.categoryDetailsFacade.updateMaintenance(maintenance);
  }

  private findRecord(id: string): Record {
    return this.categoryDetails.tables
      .map((table) => table.data)
      .reduce((acc, curr) => acc.concat(...curr))
      .find((record) => record.id === id);
  }

  public toogleExpandStates(state): void {
    this.expandPanelToggles = Array.from({length: this.expandPanelToggles.length}, () => state);
  }

  public getContentHeight(content: HTMLElement): string {
    const height = 0;
    return `${[...(content.children as any)].reduce((acc, curr) => acc + curr.getBoundingClientRect().height, height)}px`;
  }

  public onNavigateToDetails(id: string, name: string): void {
    const groupData: GroupData = {
      routeName: 'details',
      group: { id, parent: this.categoryDetails.data.id, name },
    };

    this.groupTreeService.selectedItem(groupData);
  }

  public get isAllExpanded(): boolean {
    return this.expandPanelToggles.every(toggle => toggle);
  }

  private getExportTranslatedText(): Observable<[string, string]> {
    return combineLatest([
      this.translateService.get("NOTIFICATIONS.EXPORT.TEXT"),
      this.translateService.get("NOTIFICATIONS.EXPORT.ACTION"),
    ]);
  }
}
