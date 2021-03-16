import { LocaleEnum } from "./locale-enum";
import { IconTypeEnum } from "./icon-type.enum";
export interface Settings {
  language: string;
  region: LocaleEnum;
  databasePath: string;
  appearance: {
    iconPack: string;
    type: IconTypeEnum;
  }
}