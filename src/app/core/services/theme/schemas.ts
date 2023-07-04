import { AppearanceType } from "@shared/components/settings/interface";

export const schemas: Array<{type: AppearanceType, name: string}> = [{
  type: 'light',
  name: 'SCHEMAS.LIGHT'
}, {
  type: 'dark',
  name: 'SCHEMAS.DARK'
}, {
  type: 'auto',
  name: 'SCHEMAS.AUTO'
}];
