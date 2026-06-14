import { maintenanceReducer } from './reducers';
import { initialState } from './initial-state';
import * as MaintenanceActions from './actions';
import { Status } from '../../core/state.interfaces';
import { Maintenance } from '@core/interfaces/maintenance';
import { ProjectStatusEnum } from './enums';

const maintenance: Maintenance = {
  parent: 'car-1',
  status: ProjectStatusEnum.InProgress,
  note: 'oil change',
  completedParts: ['p1'],
};

describe('maintenanceReducer', () => {
  it('returns the initial state for an unknown action', () => {
    const state = maintenanceReducer(undefined, { type: 'unknown' } as any);
    expect(state).toEqual(initialState);
  });

  it('moves maintenance to Loading on updateMaintenance', () => {
    const state = maintenanceReducer(initialState, MaintenanceActions.updateMaintenance({ maintenance }));

    expect(state.maintenance).toEqual({ status: Status.Loading, value: null, error: null });
  });

  it('stores the value with Success on updateMaintenanceSuccess', () => {
    const state = maintenanceReducer(
      initialState,
      MaintenanceActions.updateMaintenanceSuccess({ maintenance }),
    );

    expect(state.maintenance).toEqual({ status: Status.Success, value: maintenance, error: null });
  });

  it('does not mutate the previous state', () => {
    const before = JSON.parse(JSON.stringify(initialState));
    maintenanceReducer(initialState, MaintenanceActions.updateMaintenanceSuccess({ maintenance }));

    expect(initialState).toEqual(before);
  });
});
