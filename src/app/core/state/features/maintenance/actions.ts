import { Maintenance } from "@core/interfaces/maintenance";
import { createAction, props } from "@ngrx/store";

export const updateMaintenance = createAction('[Core] Update Maintenance', props<{ maintenance: Maintenance }>());
export const updateMaintenanceSuccess = createAction('[Core] Update Maintenance Success', props<{ maintenance: Maintenance }>());