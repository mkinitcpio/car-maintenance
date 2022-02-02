import { ProjectStatusEnum } from "@core/state/features/maintenance/enums";

export interface Maintenance {
  parent: string;
  status: ProjectStatusEnum;
  note: string;
  completedParts: string[];
}