import { Injectable } from '@angular/core';
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
    console.log(parentId);
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
    console.log(id);
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
}
