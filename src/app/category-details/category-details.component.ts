import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, pairwise } from 'rxjs/operators';
import { CategoryTree } from '../navigation/state/interface';
import { NavigationFacade } from '../navigation/state/navigation.facade';
import { Status } from '../state/interface';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  private id: string;
  public category: CategoryTree;
  public recordTables: any;

  constructor(
    private navigationFacade: NavigationFacade,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.navigationFacade.categories$
      .pipe(
        pairwise(),
        filter(([prev, curr]) => prev.status === Status.Loading && curr.status === Status.Success),
        map(([_, curr]) => curr.value),
        map((categories) => categories.filter(category => category.id === this.id)[0]),
      )
      .subscribe((category) => {
        this.category = category;
      });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.navigationFacade.loadCategories();
    });
  }

}
