import { maintenanceSelectors } from './selectors';
import { initialState } from './initial-state';
import { Status } from '../../core/state.interfaces';
import { MaintenanceFeatureState } from './feature.interface';

describe('maintenanceSelectors', () => {
  it('getUpdatedMaintenance returns the maintenance slice', () => {
    const featureState: MaintenanceFeatureState = {
      maintenance: { status: Status.Success, value: null, error: null },
    };

    const result = maintenanceSelectors.getUpdatedMaintenance({ maintenance: featureState } as any);

    expect(result).toBe(featureState.maintenance);
  });

  it('getUpdatedMaintenance returns the initial slice by default', () => {
    const result = maintenanceSelectors.getUpdatedMaintenance({ maintenance: initialState } as any);

    expect(result.status).toBe(Status.Init);
  });
});
