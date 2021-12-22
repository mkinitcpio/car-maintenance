import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryTree } from '../navigation/state/interface';
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

  @listen()
  recordChanges$ = merge(
    this.detailsFacade.editDetail$,
    this.detailsFacade.deleteDetail$,
  );

  @listen({ value: true })
  categoryChanges$ = merge(
    this.navigationFacade.newCategory$,
    this.navigationFacade.editCategory$,
  );

  public id: string;
  public category: CategoryTree;
  public categoryDetails: CategoryDetails;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private detailsFacade: DetailsFacade,
    private navigationFacade: NavigationFacade,
    private dialogManagerService: DialogManagerService,
    private categoryDetailsFacade: CategoryDetailsFacade,
  ) {
    super();
  }

  ngOnInit(): void {
    this.categoryDetails$.subscribe((categoryDetails) => {
      this.categoryDetails = categoryDetails;
    });

    this.recordChanges$.subscribe(() => {
      this.categoryDetailsFacade.loadCategoryDetails(this.id);
    });

    this.categoryChanges$.subscribe((category) => {
      if(category.parent === this.id || this.id === category.id) {
        this.categoryDetailsFacade.loadCategoryDetails(this.id);
      }
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
        totalCost: this.getResultCost(table.data),
      }));

    this.dialogManagerService.openPrintDialog({
      title: this.categoryDetails.name,
      multiply: true,
      tablesData,
    });
  }

  private getResultCost(records: Record[]): number {
    const costs = records.map((record) => +record.cost).filter(Boolean);

    return costs.reduce((acc, cost) => acc + cost , 0);
  }

  private findRecord(id: string): Record {
    return this.categoryDetails.tables
      .map((table) => table.data)
      .reduce((acc, curr) => acc.concat(...curr))
      .find((record) => record.id === id);
  }
}
