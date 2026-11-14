import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { CarCategory, CarCategoryFormData } from '@core/interfaces/car-category';
import { EntityState } from '../../state/interface';
import { Category, CategoryTree, CategoryTypeEnum } from '../../navigation/state/interface';
import { NavigationFacade } from '../../navigation/state/navigation.facade';
import { FormModeEnum } from '../components/create-dialog/form-mode.enum';
import { DialogManagerService } from './dialog-manager.service';

type CarCategoryState = EntityState<{ data: CarCategory; children: Category[] }>;

@Injectable({
  providedIn: 'root',
})
export class CategoryManagementService {

  private readonly navigationFacade = inject(NavigationFacade);
  private readonly dialogManagerService = inject(DialogManagerService);
  private readonly translateService = inject(TranslateService);

  public editCategory(category: Category | CategoryTree): void {
    if (category.type === CategoryTypeEnum.Car) {
      this.editCarCategory(category.id);
      return;
    }

    this.navigationFacade.categories$
      .pipe(
        take(1),
        map((state: EntityState<CategoryTree[]>) => state.value ?? []),
        map((categories) => ({
          parents: this.getListOfParents(categories),
          formData: this.getFlatTreeView(categories).find((item) => item.id === category.id) ?? category,
        })),
        switchMap(({ parents, formData }) => this.dialogManagerService.openCategoryDialog({
          mode: FormModeEnum.Edit,
          parents,
          formData,
        })),
      )
      .subscribe((updatedCategory) => this.navigationFacade.editCategory(updatedCategory));
  }

  public deleteCategory(category: Category | CategoryTree): void {
    this.translateService.get('DIALOG.DELETE.DECLESIONS.GROUPS')
      .pipe(
        switchMap((translation) => this.dialogManagerService.openDeleteCategoryDialog({ name: translation })),
      )
      .subscribe(() => {
        if (category.type === CategoryTypeEnum.Car) {
          this.navigationFacade.deleteCarCategory(category.id);
        } else {
          this.navigationFacade.deleteCategory(category as Category);
        }
      });
  }

  private editCarCategory(id: string): void {
    this.navigationFacade.getCarCategory(id);

    this.navigationFacade.carCategory$
      .pipe(
        filter((state: CarCategoryState) => state.value?.data?.id === id),
        take(1),
        switchMap((state: CarCategoryState) => {
          const formData = {
            ...state.value.data,
            parts: state.value.children,
          } as unknown as CarCategoryFormData;

          return this.dialogManagerService.openCarDialog({ mode: FormModeEnum.Edit, formData });
        }),
      )
      .subscribe((carCategory) => this.navigationFacade.editCarCategory(carCategory));
  }

  private getListOfParents(categories: CategoryTree[]): Array<{ name: string; value: string }> {
    return categories.map(({ name, id }) => ({ name, value: id }));
  }

  private getFlatTreeView(categories: CategoryTree[]): Category[] {
    return categories
      .map((value) => [value, ...(value.children ?? [])])
      .flat()
      .map(({ id, name, parent, illustration, type }) => ({ id, name, parent, illustration, type } as Category));
  }
}
