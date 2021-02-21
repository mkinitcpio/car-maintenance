import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryTree } from '../navigation/state/interface';
import { CategoryDetailsFacade } from './state/category-details.facade';
import { CategoryDetails } from './state/interface';
import {SubscriptionListener} from "../core/subscription-listener";
import { Record } from '../detail/state/interface';
import { FormModeEnum } from '../shared/components/create-dialog/form-mode.enum';
import { DetailsFacade } from '../detail/state/details.facade';
import { DialogManagerService } from '../shared/services/dialog-manager.service';
import { NavigationFacade } from '../navigation/state/navigation.facade';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent extends SubscriptionListener implements OnInit {
  private id: string;
  public category: CategoryTree;
  public categoryDetails: CategoryDetails;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detailsFacade: DetailsFacade,
    private navigationFacade: NavigationFacade,
    private dialogManagerService: DialogManagerService,
    private categoryDetailsFacade: CategoryDetailsFacade,
  ) {
    super();
  }

  ngOnInit(): void {
    this.listenLoadedEntity$<CategoryDetails>(this.categoryDetailsFacade.categoryDetails$)
      .subscribe(([_, curr]) => {
        this.categoryDetails = curr.value;
      });

    this.listenLoadedEntity$([
      this.detailsFacade.editDetail$,
      this.detailsFacade.deleteDetail$,
    ]).subscribe(() => {
      this.categoryDetailsFacade.loadCategoryDetails(this.id);
    });

    this.listenLoadedEntity$<CategoryTree>([
      this.navigationFacade.newCategory$,
      this.navigationFacade.editCategory$,
      this.navigationFacade.deleteCategory$,
    ]).subscribe(([_, curr]) => {
      if(curr.value.parent === this.id) {
        this.categoryDetailsFacade.loadCategoryDetails(this.id);
      }
    });

    this.listenLoadedEntity$<CategoryTree>([
      this.navigationFacade.deleteCategory$,
    ]).subscribe(([_, curr]) => {
      if(this.id === curr.value.id) {
        this.router.navigate(['']);
      }
    });

    this.listenLoadedEntity$<CategoryTree>([
      this.navigationFacade.editCategory$,
    ]).subscribe(([_, curr]) => {
      if(this.id === curr.value.id) {
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

  private findRecord(id: string): Record {
    return this.categoryDetails.tables
      .map((table) => table.data)
      .reduce((acc, curr) => acc.concat(...curr))
      .find((record) => record.id === id);
  }
}
