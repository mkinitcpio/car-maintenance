import { Component, OnInit } from '@angular/core';
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
import { merge } from 'rxjs';
import { AutoCloseable } from '../core/auto-closeable';
import { UtilsService } from '@shared/services/utils.service';
import { SettingsService } from '@shared/components/settings/settings.service';
import { ElectronService } from '@core/services';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent extends AutoCloseable implements OnInit {

  @listen({ value: true })
  categoryDetails$ = this.categoryDetailsFacade.categoryDetails$;

  @listen({ value: true })
  deleteCategory$ = this.navigationFacade.deleteCategory$;

  @listen({ value: true })
  updatedMaintenance$ = this.categoryDetailsFacade.updatedMaintenance$;

  @listen()
  recordChanges$ = merge(
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

  public id: string;
  public category: CategoryTree;
  public categoryDetails: CategoryDetails;
  public totalCost: number;
  public sitesForSearch = [{
    name: "Amazon",
    url: "https://www.amazon.com/s?k=",
  }, {
    name: "Ebay",
    url: "https://www.ebay.com/sch/i.html?_nkw=",
  }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilsSerivce: UtilsService,
    private detailsFacade: DetailsFacade,
    public settingsService: SettingsService,
    private electronService: ElectronService,
    private navigationFacade: NavigationFacade,
    private dialogManagerService: DialogManagerService,
    private categoryDetailsFacade: CategoryDetailsFacade,
  ) {
    super();
  }

  ngOnInit(): void {
    this.categoryDetails$.subscribe((categoryDetails) => {
      this.categoryDetails = categoryDetails;
      this.totalCost = this.categoryDetails.tables.map(table => this.utilsSerivce.getResultCost(table.data)).reduce((acc, cur) => acc + cur, 0);
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
        this.router.navigate(['']);
      }

      if(this.id === category.parent) {
        this.categoryDetailsFacade.loadCategoryDetails(this.id);
      }
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.categoryDetailsFacade.loadCategoryDetails(this.id);
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
    });
  }

  public onTextAreaFocusOut(note: string): void {
    const maintenance = {...this.categoryDetails.maintenance};

    maintenance.note = note;
    this.categoryDetailsFacade.updateMaintenance(maintenance);
  }

  public onSearch(url: string, name: string): void {
    const parsedName = name.replace(/[ ]/g, '+');

    this.electronService.shell.openExternal(url + parsedName);
  }

  private findRecord(id: string): Record {
    return this.categoryDetails.tables
      .map((table) => table.data)
      .reduce((acc, curr) => acc.concat(...curr))
      .find((record) => record.id === id);
  }
}
