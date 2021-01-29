import { Injectable } from '@angular/core';
import { CategoryDetail, CategoryDetails } from '../category-details/state/interface';
import { Record } from '../detail/state/interface';
import { Category } from '../navigation/state/interface';
import { ElectronService } from './services';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DataBaseService {
  private data: {
    categories: Category[],
    records: Record[],
  };

  private dbPath: string;

  constructor(private electronService: ElectronService) {
  }

  public getCategories(): Array<Category> {
    const db = this.data;
    return db.categories;
  }

  public getRecords(parentId: string): Array<any> {
    const db = this.data;
    return db.records.filter((record) => record.parent === parentId);
  }

  public saveNewCategory(category: Category): void {
    const db = this.data;
    db.categories.push(category);

    this.writeToDataBase();
  }

  public saveNewRecord(record: Record): void {
    const db = this.data;
    db.records.push(record);

    this.writeToDataBase();
  }

  public deleteCategory(id: string): void {
    const db = this.data;
    db.categories = db.categories
      .filter(category => category.id !== id)
      .filter(category => category.parent !== id);

    this.writeToDataBase();
  }

  public deleteRecord(id: string): void {
    const db = this.data;
    db.records = db.records.filter(record => record.id !== id);

    this.writeToDataBase();
  }

  public editCategory(category: Category): void {
    const db = this.data;
    db.categories = db.categories.map(c => c.id === category.id ? category : c);

    this.writeToDataBase();
  }

  public editRecord(record: Record): void {
    const db = this.data;
    db.records = db.records.map(r => r.id === record.id ? record : r);

    localStorage.setItem('db', JSON.stringify(db));
  }

  public getCategoryDetails(id: string): CategoryDetails {
    const db = this.data;
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

  public dbExist$: Subject<boolean> = new BehaviorSubject(false);
  public initDataBase(): void {
    const dbPath = localStorage.getItem('dbPath');

    if(dbPath) {
      this.dbPath = dbPath;
      this.readFileData(dbPath);
    } else {
      this.dbExist$.next(false);
    }
  }

  private readFileData(path: string): void {
    this.electronService.fs.readFile(path, { flag: 'r', encoding: 'utf8'}, (error, file) => {
      this.data = JSON.parse(file);
      this.dbExist$.next(true);
    });
  }

  private writeToDataBase(): void {
    this.electronService.fs.writeFile(this.dbPath, JSON.stringify(this.data), { encoding: 'utf8'}, () => {
      console.log('done');
    });
  }
}
