import { ColorEnum } from "@shared/components/settings/colors-enum";
import { CurrencyEnum } from "@shared/components/settings/currency.enum";
import { IconTypeEnum } from "@shared/components/settings/icon-type.enum";
import { LocaleEnum } from "@shared/components/settings/locale-enum";
import { MetricSystemEnum } from "@shared/components/settings/metric-system.enum";
import { NavigationTabEnum } from "@shared/components/settings/navigation-tab.enum";
import { NavigationEnum } from "app/home/navigation-bar/navigation.enum";
import { Settings } from "./interface";

export const defaultSettings: Settings = {
  language: 'en',
  databasePath: null,
  startPage: NavigationEnum.Dashboard,
  region: LocaleEnum.Us,
  appearance: {
    appearance: 'light',
    iconPack: "default",
    type: IconTypeEnum.Color,
    animations: true,
    primaryColor: ColorEnum.Default,
  },
  units: {
    metricSystem: MetricSystemEnum.Km,
    currency: CurrencyEnum.Usd,
  },
  firstTab: NavigationTabEnum.Categories,
};