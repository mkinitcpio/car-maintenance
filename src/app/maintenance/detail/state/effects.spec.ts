import { of } from 'rxjs';

import { DetailsEffects } from './effects';
import * as DetailsActions from './actions';
import { createDataBaseServiceMock } from 'testing/test-mocks';

describe('DetailsEffects', () => {
    let database: any;

    beforeEach(() => {
        database = createDataBaseServiceMock();
    });

    const effectsFor = (action: any) => new DetailsEffects(of(action) as any, database);

    it('getRecords$ loads records and defaults missing labels to an empty array', async () => {
        database.getRecords.mockReturnValue([{ id: 'r1', parent: 'p', labels: null }]);

        effectsFor(DetailsActions.getRecords({ id: 'p' })).getRecords$.subscribe((result) => {
            expect(database.getRecords).toHaveBeenCalledWith('p');
            expect(result).toEqual(DetailsActions.getRecordsSuccess({ records: [{ id: 'r1', parent: 'p', labels: [] } as any] }));
            ;
        });
    });

    it('newRecord$ saves the record and signals success', async () => {
        const record = { id: 'r1', labels: [] } as any;

        effectsFor(DetailsActions.createRecord({ record })).newRecord$.subscribe((result) => {
            expect(database.saveNewRecord).toHaveBeenCalledWith(record);
            expect(result).toEqual(DetailsActions.createRecordsSuccess());
            ;
        });
    });

    it('deleteRecord$ deletes the ids and echoes them on success', async () => {
        effectsFor(DetailsActions.deleteRecord({ ids: ['a', 'b'] })).deleteRecord$.subscribe((result) => {
            expect(database.deleteRecord).toHaveBeenCalledWith(['a', 'b']);
            expect(result).toEqual(DetailsActions.deleteRecordSuccess({ ids: ['a', 'b'] }));
            ;
        });
    });

    it('editRecord$ edits the record and signals success', async () => {
        const record = { id: 'r1', labels: [] } as any;

        effectsFor(DetailsActions.editRecord({ record })).editRecord$.subscribe((result) => {
            expect(database.editRecord).toHaveBeenCalledWith(record);
            expect(result).toEqual(DetailsActions.editRecordSuccess());
            ;
        });
    });

    it('moveRecords$ moves the records and signals success', async () => {
        effectsFor(DetailsActions.moveRecords({ parentId: 'p2', recordIds: ['r1'] })).moveRecords$.subscribe((result) => {
            expect(database.moveRecords).toHaveBeenCalledWith('p2', ['r1']);
            expect(result).toEqual(DetailsActions.moveRecordsSuccess());
            ;
        });
    });
});
