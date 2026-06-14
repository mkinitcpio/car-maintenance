import { DataBaseService } from './database';
import { createElectronServiceMock, createSettingsServiceMock, ElectronServiceMock } from 'testing/test-mocks';
import { Category, CategoryTypeEnum } from '../navigation/state/interface';
import { Record } from '../detail/state/interface';

const category = (over: Partial<Category>): Category =>
  ({ id: '', name: '', parent: null, type: CategoryTypeEnum.Category, ...over } as Category);

const record = (over: Partial<Record>): Record =>
  ({
    id: '',
    name: '',
    parent: null,
    date: new Date(),
    cost: '0',
    mileage: 0,
    notes: '',
    labels: [],
    ...over,
  } as Record);

describe('DataBaseService', () => {
  let service: DataBaseService;
  let electron: ElectronServiceMock;
  let settings: any;

  beforeEach(() => {
    electron = createElectronServiceMock();
    settings = createSettingsServiceMock();
    service = new DataBaseService(electron as any, settings);
  });

  function seed(data: { [key: string]: any }): void {
    (service as any).data = {
      categories: [],
      records: [],
      cars: [],
      maintenances: [],
      labels: [],
      ...data,
    };
  }

  describe('getCategories', () => {
    it('merges categories and cars', () => {
      seed({
        categories: [category({ id: 'c1' })],
        cars: [category({ id: 'car1', type: CategoryTypeEnum.Car })],
      });

      expect(service.getCategories().map((c) => c.id)).toEqual(['c1', 'car1']);
    });
  });

  describe('getRecords', () => {
    it('returns only records belonging to the parent', () => {
      seed({
        records: [
          record({ id: 'r1', parent: 'p1' }),
          record({ id: 'r2', parent: 'p2' }),
          record({ id: 'r3', parent: 'p1' }),
        ],
      });

      expect(service.getRecords('p1').map((r) => r.id)).toEqual(['r1', 'r3']);
    });
  });

  describe('saveNewRecord', () => {
    it('appends the record and persists the database', () => {
      seed({ records: [] });

      service.saveNewRecord(record({ id: 'r1', parent: 'p1' }));

      expect(service.getRecords('p1').map((r) => r.id)).toEqual(['r1']);
      expect(electron.fs.writeFile).toHaveBeenCalled();
    });

    it('merges labels from the new record', () => {
      seed({ records: [], labels: ['old'] });

      service.saveNewRecord(record({ id: 'r1', parent: 'p1', labels: ['new', 'old'] }));

      expect(service.getLabels().sort()).toEqual(['new', 'old']);
    });
  });

  describe('deleteRecord', () => {
    it('removes records whose id is in the list', () => {
      seed({
        records: [record({ id: 'r1' }), record({ id: 'r2' }), record({ id: 'r3' })],
      });

      service.deleteRecord(['r1', 'r3']);

      expect((service as any).data.records.map((r: Record) => r.id)).toEqual(['r2']);
      expect(electron.fs.writeFile).toHaveBeenCalled();
    });
  });

  describe('deleteCategory', () => {
    it('removes the category and its direct children', () => {
      seed({
        categories: [
          category({ id: 'c1' }),
          category({ id: 'c2', parent: 'c1' }),
          category({ id: 'c3' }),
        ],
      });

      service.deleteCategory('c1');

      expect((service as any).data.categories.map((c: Category) => c.id)).toEqual(['c3']);
    });
  });

  describe('editCategory', () => {
    it('replaces the matching category', () => {
      seed({ categories: [category({ id: 'c1', name: 'Old' })] });

      service.editCategory(category({ id: 'c1', name: 'New' }));

      expect((service as any).data.categories[0].name).toBe('New');
    });
  });

  describe('getCategoryDetails', () => {
    it('builds a table per child category with its records', () => {
      seed({
        categories: [
          category({ id: 'parent', illustration: 'car.svg' }),
          category({ id: 'child1', parent: 'parent', name: 'Engine', illustration: 'engine.svg' }),
        ],
        records: [record({ id: 'r1', parent: 'child1' }), record({ id: 'r2', parent: 'other' })],
        maintenances: [],
      });

      const details = service.getCategoryDetails('parent');

      expect(details.tables.length).toBe(1);
      expect(details.tables[0].id).toBe('child1');
      expect(details.tables[0].name).toBe('Engine');
      expect(details.tables[0].data.map((r) => r.id)).toEqual(['r1']);
      expect(details.maintenance).toBeNull();
    });

    it('falls back to cars when the parent is not a plain category', () => {
      seed({
        categories: [],
        cars: [category({ id: 'car1', type: CategoryTypeEnum.Car, illustration: 'car.svg' })],
        records: [],
      });

      const details = service.getCategoryDetails('car1');

      expect(details.type).toBe(CategoryTypeEnum.Car);
      expect(details.tables).toEqual([]);
    });
  });

  describe('createDatabaseFile', () => {
    it('writes the empty database structure to disk', () => {
      service.createDatabaseFile('/tmp/db.json');

      const [path, payload] = electron.fs.writeFileSync.calls.mostRecent().args;
      expect(path).toBe('/tmp/db.json');
      expect(JSON.parse(payload)).toEqual({
        categories: [],
        records: [],
        cars: [],
        maintenances: [],
        labels: [],
      });
    });
  });

  describe('initDataBase', () => {
    it('emits dbExist=false when no database path is configured', () => {
      settings.settings.databasePath = null;
      let exists: boolean;
      service.dbExist$.subscribe((value) => (exists = value));

      service.initDataBase();

      expect(exists).toBe(false);
    });

    it('loads and exposes data when the file is valid', () => {
      settings.settings.databasePath = '/tmp/db.json';
      electron.fs.readFileSync.and.returnValue(
        JSON.stringify({ categories: [{ id: 'c1' }], records: [{ id: 'r1', parent: 'c1' }] }),
      );

      service.initDataBase();

      expect(service.getRecords('c1').map((r) => r.id)).toEqual(['r1']);
    });

    it('emits a database error when the file cannot be parsed', () => {
      settings.settings.databasePath = '/tmp/db.json';
      electron.fs.readFileSync.and.returnValue('not-json');
      const errorSpy = jasmine.createSpy('databaseError');
      service.databaseError$.subscribe(errorSpy);

      service.initDataBase();

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
