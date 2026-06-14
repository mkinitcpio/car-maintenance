import { of } from 'rxjs';

import { MaintenanceEffects } from './effects';
import * as MaintenanceActions from './actions';
import { ProjectStatusEnum } from './enums';
import { Maintenance } from '@core/interfaces/maintenance';
import { createDataBaseServiceMock } from 'testing/test-mocks';

const maintenance: Maintenance = {
  parent: 'car-1',
  status: ProjectStatusEnum.InProgress,
  note: 'oil change',
  completedParts: ['p1'],
};

describe('MaintenanceEffects', () => {
  let database: any;

  beforeEach(() => {
    database = createDataBaseServiceMock();
  });

  it('persists the maintenance and emits the success action', (done) => {
    database.updateMaintenance.and.returnValue(of(maintenance));
    const effects = new MaintenanceEffects(
      of(MaintenanceActions.updateMaintenance({ maintenance })) as any,
      database,
    );

    effects.deleteCarCategory$.subscribe((result) => {
      expect(database.updateMaintenance).toHaveBeenCalledWith(maintenance);
      expect(result).toEqual(MaintenanceActions.updateMaintenanceSuccess({ maintenance }));
      done();
    });
  });
});
