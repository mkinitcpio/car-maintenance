import { LocaleEnum } from "./locale-enum";
import { IconTypeEnum } from "./icon-type.enum";
import { CurrencyEnum } from "./currency.enum";
import { MetricSystemEnum } from "./metric-system.enum";
import { NavigationTabEnum } from "./navigation-tab.enum";
export interface Settings {
  language: string;
  region: LocaleEnum;
  databasePath: string;
  appearance: {
    iconPack: string;
    type: IconTypeEnum;
    animations: boolean;
  },
  units: {
    currency: CurrencyEnum,
    metricSystem: MetricSystemEnum,
  },
  firstTab: NavigationTabEnum,
}