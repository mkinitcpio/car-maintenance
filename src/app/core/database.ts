import { Injectable } from '@angular/core';
import { CategoryDetail, CategoryDetails } from '../category-details/state/interface';
import { Record } from '../detail/state/interface';
import { Category } from '../navigation/state/interface';
import { ElectronService } from './services';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import { SettingsService } from '../shared/components/settings/settings.service';
import { CarCategory } from './interfaces/car-category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataBaseService {

  public readonly confPath: string = this.electronService.os.homedir() + '/.config/Учет/conf';
  public readonly initialDataBase = {
    categories: [],
    records: [],
    cars: []
  };

  private fileReadConfig: {
    flag: 'r',
    encoding: 'utf8',
  };
  private fileWriteConfig: {
    encoding: 'utf8',
  };
  private data: {
    categories: Category[],
    records: Record[],
    cars: CarCategory[],
  };

  public databaseError$: Subject<void> = new Subject();

  constructor(
    private electronService: ElectronService,
    private settingsService: SettingsService,
  ) {
  }

  public getCategories(): Array<Category> {
    const db = this.data;
    return [...db.categories, ...db.cars ];
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

  public saveNewCarCategory(carCategory: CarCategory, parts: Category[]): Observable<CarCategory> {
    const db = this.data;

    if(db.cars) {
      db.cars.push(carCategory);
    } else {
      db.cars = [carCategory];
    }

    db.categories.push(...parts);

    return this.writeToDataBaseAsync().pipe(
      map(() => carCategory),
    );
  }

  public getCarCategory(id: string): Observable<{data: CarCategory, children: Category[]}> {
    const data = {
      data: this.data.cars.find(car => car.id === id),
      children: this.data.categories
        .filter(category => category.parent === id),
    };

    return of(data);
  }

  public editCarCategory(carCategory: CarCategory): Observable<string> {
    this.data.cars = this.data.cars.map(c => c.id === carCategory.id ? carCategory : c);

    return this.writeToDataBaseAsync().pipe(
      map(() => carCategory.id),
    );
  }

  public deleteCarCategory(id: string): Observable<string> {
    this.data.cars = this.data.cars.filter(car => car.id !== id);
    const childCategoriesId = this.data.categories.filter(category => category.parent === id).map(c => c.id);

    this.data.categories = this.data.categories.filter(category => category.parent !== id);
    this.data.records = this.data.records.filter(record => childCategoriesId.includes(record.parent));

    return this.writeToDataBaseAsync().pipe(
      map(() => id)
    );
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

    this.writeToDataBase();
  }

  public getCategoryDetails(id: string): CategoryDetails {
    const db = this.data;
    const parentCategory = db.categories.find(category => category.id === id);
    const childCategories = db.categories.filter(category => category.parent === id);
    const allRecords = db.records;

    const tablesData: CategoryDetail[] = childCategories.map(category => {
      const records = allRecords.filter(record => record.parent === category.id);

      return {
        id: category.id,
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
    const dbPath = this.settingsService.settings.databasePath;
    if(dbPath) {
      this.readFileData(dbPath);
    } else {
      this.dbExist$.next(false);
    }
  }

  private readFileData(path: string): void {
    try{
      const data = JSON.parse(this.electronService.fs.readFileSync(path, this.fileReadConfig));

      if(!data?.categories || !data?.records) {
        throw new Error();
      } else {
        this.data = data;
      }
      this.dbExist$.next(true);
    } catch(error) {
      this.databaseError$.next();
    }
  }

  public createDatabaseFile(path: string): void {
    this.electronService.fs.writeFileSync(path, JSON.stringify(this.initialDataBase), this.fileWriteConfig);
  }

  private writeToDataBase(): void {
    this.electronService.fs.writeFile(this.settingsService.settings.databasePath, JSON.stringify(this.data), this.fileWriteConfig, () => {});
  }

  private writeToDataBaseAsync(): Observable<any> {
    return of(this.electronService.fs.promises.writeFile(this.settingsService.settings.databasePath, JSON.stringify(this.data)));
  }
}
