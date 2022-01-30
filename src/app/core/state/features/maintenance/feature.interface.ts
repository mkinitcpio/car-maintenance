import { Maintenance } from "@core/interfaces/maintenance";
import { EntityState } from "../../core/state.interfaces";

export interface MaintenanceFeatureState {
  maintenance: EntityState<Maintenance>
}