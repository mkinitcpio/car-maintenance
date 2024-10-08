import { Component, inject, OnInit } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";

import { FormModeEnum } from "../shared/components/create-dialog/form-mode.enum";
import { NavigationFacade } from "./state/navigation.facade";
import { Category, CategoryTree, CategoryTypeEnum } from "./state/interface";

import { ActivatedRoute, Router } from "@angular/router";
import { DialogManagerService } from "../shared/services/dialog-manager.service";

import { listen } from "../core/decorators";
import { merge } from "rxjs";
import { AutoCloseable } from "../core/auto-closeable";
import { filter, skip, switchMap, take, takeUntil } from "rxjs/operators";
import { DataBaseService } from "../core/database";

import { SideNavigationTrackerService } from "../home/side-navigation-tracker.service";
import { CarCategoryFormData } from "@core/interfaces/car-category";
import { SettingsService } from "@shared/components/settings/settings.service";
import { SettingsTypeEnum } from "@shared/components/settings/settings-type.enum";
import { GroupData, GroupTreeService } from "./categories-tree/group-tree.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent extends AutoCloseable implements OnInit {

  @listen({ value: true })
  deleteCategory$ = merge(
    this.navigationFacade.deleteCategory$,
    this.navigationFacade.deleteCarCategory$,
  );

  @listen({value: true})
  categories$ = this.navigationFacade.categories$;

  @listen({value: true})
  carCategory$ = this.navigationFacade.carCategory$;

  @listen()
  categoryChanges$ = merge(
    this.navigationFacade.newCategory$,
    this.navigationFacade.editCategory$,
    this.navigationFacade.deleteCategory$,
    this.navigationFacade.newCarCategory$,
    this.navigationFacade.deleteCarCategory$,
    this.navigationFacade.editCarCategory$,
  );

  private translateService = inject(TranslateService);

  public dataSource = new MatTreeNestedDataSource<any>();
  public selectedCategory: Category;
  public selected: string = null;
  public categories: CategoryTree[];
  public CategoryTypeEnum = CategoryTypeEnum;
  public selectedTabIndex = 0;

  public tabs = ['PAGES.NAVIGATION.TABS.CATEGORIES', 'PAGES.NAVIGATION.TABS.CARS'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationFacade: NavigationFacade,
    private dialogManagerService: DialogManagerService,
    private dataBaseService: DataBaseService,
    private settingsService: SettingsService,
    public sideNavService: SideNavigationTrackerService,
    public groupTreeService: GroupTreeService,
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
      .subscribe((categories) => {
        this.categories = categories;
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
    const parentList = this.getListOfParents(this.categories);
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

  private getFlatTreeView(categories): Array<{ name: string; value: string; id: string, parent: string }> {
    return categories
      .map((value) => [value, ...value.children])
      .flat(2)
      .filter((value) => value)
      .map((value) => {
        const { children, ...data } = value;
        return data;
      });
  }

  public onEdit(category: Category): void {
    const formData = this.getFlatTreeView(this.categories).find((row) => row.id === category.id);
    const parentList = this.getListOfParents(this.categories);
    const data = {
      mode: FormModeEnum.Edit,
      parents: parentList,
      formData,
    };

    this.dialogManagerService.openCategoryDialog(data)
      .subscribe((category: Category | CarCategoryFormData) => {
        this.navigationFacade.editCategory(category);
      });
  }

  public onEditCarCategory(id: string): void {
    this.carCategory$.pipe(
      take(1),
      switchMap((carCategory: any) => {
        const formData : CarCategoryFormData = {...carCategory.data, parts: carCategory.children};
        return this.dialogManagerService.openCarDialog({ mode: FormModeEnum.Edit, formData });
      })
    ).subscribe((data) => {
      this.navigationFacade.editCarCategory(data);
    });

    this.navigationFacade.getCarCategory(id);
  }

  public onDelete(category: Category): void {
    this.translateService.get("DIALOG.DELETE.DECLESIONS.GROUPS")
      .pipe(switchMap(translation => this.dialogManagerService.openDeleteCategoryDialog({name: translation})))
      .subscribe(() => {
        if(category.type === CategoryTypeEnum.Category) {
          this.navigationFacade.deleteCategory(category);
        } else {
          this.navigationFacade.deleteCarCategory(category.id);
        }
      });
  }

  public onFeedback(): void {
    this.dialogManagerService.openFeedbackDialog();
  }

  public fitlerCategoriesByType(categories: CategoryTree[] ,type: CategoryTypeEnum): CategoryTree[] {
    return categories.filter(category => category.type === type);
  }

  public onSelectTab(index: number): void {
    this.selectedTabIndex = index;
  }

  public onAdd(selectedTabIndex: number): void {
    selectedTabIndex ? this.addCarCategory() : this.addCategory();
  }
}
