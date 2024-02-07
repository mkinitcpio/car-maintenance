import { LocaleEnum } from "./locale-enum";
import { IconTypeEnum } from "./icon-type.enum";
import { CurrencyEnum } from "./currency.enum";
import { MetricSystemEnum } from "./metric-system.enum";
import { NavigationTabEnum } from "./navigation-tab.enum";
import { ColorEnum } from "./colors-enum";
import { NavigationEnum } from "app/home/navigation-bar/navigation.enum";

export type AppearanceType = 'dark' | 'light' | 'auto';
export interface Settings {
  language: string;
  region: LocaleEnum;
  databasePath: string;
  startPage: NavigationEnum,
  appearance: {
    appearance: AppearanceType,
    iconPack: string;
    type: IconTypeEnum;
    animations: boolean;
    primaryColor:ColorEnum
  },
  units: {
    currency: CurrencyEnum,
    metricSystem: MetricSystemEnum,
  },
  firstTab: NavigationTabEnum,
  details: {
    table: {
      hiddenColumns: string [],
    }
  }
}