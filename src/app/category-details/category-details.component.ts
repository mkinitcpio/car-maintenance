import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, pairwise } from 'rxjs/operators';
import { CategoryTree } from '../navigation/state/interface';
import { Status } from '../state/interface';
import { CategoryDetailsFacade } from './state/category-details.facade';
import { CategoryDetails } from './state/interface';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  private id: string;
  public category: CategoryTree;
  public categoryDetails: CategoryDetails;

  constructor(
    private categoryDetailsFacade: CategoryDetailsFacade,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.categoryDetailsFacade.categoryDetails$
      .pipe(
        pairwise(),
        filter(([prev, curr]) => prev.status === Status.Loading && curr.status === Status.Success),
        map(([_, curr]) => curr.value),
      ).subscribe((categoryDetails) => {
        this.categoryDetails = categoryDetails;
      });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.categoryDetailsFacade.loadCategoryDetails(this.id);
    });
  }

}
