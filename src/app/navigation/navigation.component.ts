import { ChangeDetectionStrategy, Component, OnInit, computed, signal, viewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";

import { FormModeEnum } from "../shared/components/create-dialog/form-mode.enum";
import { NavigationFacade } from "./state/navigation.facade";
import { Category, CategoryTree, CategoryTypeEnum } from "./state/interface";

import { ActivatedRoute, Router } from "@angular/router";
import { DialogManagerService } from "../shared/services/dialog-manager.service";

import { listen } from "../core/decorators";
import { merge } from "rxjs";
import { AutoCloseable } from "../core/auto-closeable";
import { filter, skip, takeUntil } from "rxjs/operators";
import { DataBaseService } from "../core/database";

import { SideNavigationTrackerService } from "../home/side-navigation-tracker.service";
import { CarCategoryFormData } from "@core/interfaces/car-category";
import { SettingsService } from "@shared/components/settings/settings.service";
import { SettingsTypeEnum } from "@shared/components/settings/settings-type.enum";
import { NavigationPanel } from "@shared/components/navigation-panel/navigation-panel";
import { GroupData, GroupTreeService } from "./categories-tree/group-tree.service";
import { TabsComponent } from "@shared/components/tabs/tabs.component";
import { CategoriesTreeComponent } from "./categories-tree/categories-tree.component";
import { CmButton } from "@shared/components/button/button";
import { CmInput } from "@shared/components/input/input";
import { EmptyStateComponent } from "@shared/components/empty-state/empty-state.component";
import { EmptyStateIllustration } from "@shared/components/empty-state/empty-state-illustration";
import { SearchIllustrationComponent } from "@shared/components/empty-state/illustrations/search-illustration";
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { CategoryManagementService } from "@shared/services/category-management.service";
import { ActionsPanel } from "@shared/components/actions-panel/actions-panel";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: ["./navigation.component.scss"],
    standalone: true,
    imports: [
    MatIconModule,
    TranslateModule,
    TabsComponent,
    CategoriesTreeComponent,
    CmButton,
    CmInput,
    EmptyStateComponent,
    EmptyStateIllustration,
    SearchIllustrationComponent,
    NavigationPanel,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatMenuContent,
    ActionsPanel,
],
})
export class NavigationComponent extends AutoCloseable implements OnInit {

  @listen({ value: true })
  deleteCategory$ = merge(
    this.navigationFacade.deleteCategory$,
    this.navigationFacade.deleteCarCategory$,
  );

  @listen({value: true})
  categories$ = this.navigationFacade.categories$;

  @listen()
  categoryChanges$ = merge(
    this.navigationFacade.newCategory$,
    this.navigationFacade.editCategory$,
    this.navigationFacade.deleteCategory$,
    this.navigationFacade.newCarCategory$,
    this.navigationFacade.deleteCarCategory$,
    this.navigationFacade.editCarCategory$,
  );

  public dataSource = new MatTreeNestedDataSource<any>();
  public selectedCategory: Category;
  public selected: string = null;
  public categories = signal<CategoryTree[]>([]);
  public CategoryTypeEnum = CategoryTypeEnum;
  public selectedTabIndex = 0;

  public searchOpen = signal<boolean>(false);
  public searchQuery = signal<string>('');
  public filteredCategories = computed<CategoryTree[]>(() =>
    this.filterCategories(this.categories(), this.searchQuery()),
  );

  private readonly searchField = viewChild<CmInput>('searchInput');

  public tabs = [{
    icon: 'tree',
    label: 'PAGES.NAVIGATION.TABS.CATEGORIES'
  }, {
    icon: 'illustrations:car',
    label: 'PAGES.NAVIGATION.TABS.CARS'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationFacade: NavigationFacade,
    private dialogManagerService: DialogManagerService,
    private dataBaseService: DataBaseService,
    private settingsService: SettingsService,
    public sideNavService: SideNavigationTrackerService,
    public groupTreeService: GroupTreeService,
    private categoryManagementService: CategoryManagementService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.groupTreeService.selected$
      .pipe(
        takeUntil(this.destroyedSource),
        filter(Boolean),
      ).subscribe((groupData: GroupData) => {
        this.router.navigate([groupData.routeName, ...Object.values(groupData.group)], { relativeTo: this.route });
      });

    this.deleteCategory$
      .subscribe((deletedCategory) => {
        const selectedGroup = this.groupTreeService.getSelectedItem();
        if(deletedCategory.id === selectedGroup?.group.id || deletedCategory.id === selectedGroup?.group.parent) {
          this.groupTreeService.selectedItem(null);
          this.router.navigate(['maintenance']);
        }
      });

    this.categoryChanges$
      .subscribe(() => {
        this.navigationFacade.loadCategories();
      });

    this.categories$
      .subscribe((categories: CategoryTree[]) => {
        this.categories.set(categories);
      });

    this.navigationFacade.loadCategories();

    this.dataBaseService.dbExist$
      .pipe(
        filter(Boolean),
        skip(1),
      )
      .subscribe(() => {
        this.router.navigate(['']);
        this.navigationFacade.loadCategories();
      });

    this.settingsService.settingsChanged$
      .pipe(filter((node) => node.type === SettingsTypeEnum.FirstTab))
      .subscribe(() => {
      });
  }

  public addCategory(category?: Category): void {
    const parentList = this.getListOfParents(this.categories());
    const data = {
      mode: FormModeEnum.Create,
      parents: parentList,
      parentId: category?.id,
    };

    this.dialogManagerService
      .openCategoryDialog(data)
      .subscribe((category: Category) => {
        this.navigationFacade.createNewCategory(category);
      });
  }

  public addCarCategory(): void {
    const data = {
      mode: FormModeEnum.Create,
    };

    this.dialogManagerService
      .openCarDialog(data)
      .subscribe((carCategoryFormData: CarCategoryFormData) => {
        this.navigationFacade.addCarCategory(carCategoryFormData);
      });
  }

  private getListOfParents(categories: CategoryTree[]): Array<{ name: string; value: string }> {
    return categories.map((value) => ({ name: value.name, value: value.id }));
  }

  public onEdit(category: Category): void {
    this.categoryManagementService.editCategory(category);
  }

  public onDelete(category: Category): void {
    this.categoryManagementService.deleteCategory(category);
  }

  public onFeedback(): void {
    this.dialogManagerService.openFeedbackDialog();
  }

  public fitlerCategoriesByType(categories: CategoryTree[] ,type: CategoryTypeEnum): CategoryTree[] {
    return categories.filter(category => category.type === type);
  }

  public openSearch(): void {
    if (this.searchOpen()) {
      return;
    }

    this.searchQuery.set('');
    this.searchOpen.set(true);
    this.groupTreeService.setSearchActive(false);

    setTimeout(() => this.searchField()?.focus());
  }

  public closeSearch(): void {
    this.searchQuery.set('');
    this.groupTreeService.setSearchActive(false);
    this.searchOpen.set(false);
  }

  public onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.groupTreeService.setSearchActive(!!value.trim());
  }

  public hasSearchResults(): boolean {
    const type = this.selectedTabIndex === 0 ? CategoryTypeEnum.Category : CategoryTypeEnum.Car;

    return this.fitlerCategoriesByType(this.filteredCategories(), type).length > 0;
  }

  private filterCategories(categories: CategoryTree[], query: string): CategoryTree[] {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
      return categories;
    }

    return categories.reduce<CategoryTree[]>((result, category) => {
      const children = category.children || [];
      const matchedChildren = children.filter((child) => this.matchesSearchTerm(child.name, searchTerm));

      if (this.matchesSearchTerm(category.name, searchTerm)) {
        result.push({ ...category, children });
      } else if (matchedChildren.length) {
        result.push({ ...category, children: matchedChildren });
      }

      return result;
    }, []);
  }

  private matchesSearchTerm(name: string, searchTerm: string): boolean {
    return !!name?.toLowerCase().includes(searchTerm);
  }

  public onSelectTab(index: number): void {
    this.selectedTabIndex = index;
  }

  public onAdd(selectedTabIndex: number): void {
    if (selectedTabIndex) {
      this.addCarCategory();
    } else {
      this.addCategory();
    }
  }
}
