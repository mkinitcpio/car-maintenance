import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryTree } from '../navigation/state/interface';
import { CategoryDetailsFacade } from './state/category-details.facade';
import { CategoryDetails } from './state/interface';
import {SubscriptionListener} from "../core/subscription-listener";

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
    private categoryDetailsFacade: CategoryDetailsFacade,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.listenLoadedEntity$<CategoryDetails>(this.categoryDetailsFacade.categoryDetails$)
      .subscribe(([_, curr]) => {
        this.categoryDetails = curr.value;
      });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.categoryDetailsFacade.loadCategoryDetails(this.id);
    });
  }

}
