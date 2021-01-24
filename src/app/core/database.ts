import { Injectable } from '@angular/core';
import { CategoryDetail, CategoryDetails } from '../category-details/state/interface';
import { Record } from '../detail/state/interface';
import { Category } from '../navigation/state/interface';

@Injectable({
  providedIn: 'root',
})
export class DataBaseService {

  constructor() {}

  public getCategories(): Array<Category> {
    const db = JSON.parse(localStorage.getItem('db'));
    return db.categories;
  }

  public getRecords(parentId: string): Array<any> {
    const db = JSON.parse(localStorage.getItem('db'));
    return db.records.filter((record) => record.parent === parentId);
  }

  public saveNewCategory(category: Category): void {
    const db = JSON.parse(localStorage.getItem('db'));
    db.categories.push(category);

    localStorage.setItem('db', JSON.stringify(db));
  }

  public saveNewRecord(record: Record): void {
    const db = JSON.parse(localStorage.getItem('db'));
    db.records.push(record);

    localStorage.setItem('db', JSON.stringify(db));
  }

  public deleteCategory(id: string): void {
    const db = JSON.parse(localStorage.getItem('db'));
    db.categories = db.categories
      .filter(category => category.id !== id)
      .filter(category => category.parent !== id);

    localStorage.setItem('db', JSON.stringify(db));
  }

  public deleteRecord(id: string): void {
    const db = JSON.parse(localStorage.getItem('db'));
    db.records = db.records.filter(record => record.id !== id);

    localStorage.setItem('db', JSON.stringify(db));
  }

  public editCategory(category: Category): void {
    const db = JSON.parse(localStorage.getItem('db'));
    db.categories = db.categories.map(c => c.id === category.id ? category : c);

    localStorage.setItem('db', JSON.stringify(db));
  }

  public editRecord(record: Record): void {
    const db = JSON.parse(localStorage.getItem('db'));
    db.records = db.records.map(r => r.id === record.id ? record : r);

    localStorage.setItem('db', JSON.stringify(db));
  }

  public getCategoryDetails(id: string): CategoryDetails {
    const db = JSON.parse(localStorage.getItem('db')) as { categories: Category[], records: Record[] };
    const parentCategory = db.categories.find(category => category.id === id);
    const childCategories = db.categories.filter(category => category.parent === id);
    const allRecords = db.records;

    const tablesData: CategoryDetail[] = childCategories.map(category => {
      const records = allRecords.filter(record => record.parent === category.id);

      return {
        name: category.name,
        data: records,
      };
    });

    return {
      name: parentCategory.name,
      tables: tablesData,
    };
  }
}
