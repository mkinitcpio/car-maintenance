import { LocaleEnum } from "./locale-enum";

export interface Settings {
  language: string;
  region: LocaleEnum;
  databasePath: string;
}