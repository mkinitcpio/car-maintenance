import { InjectionToken } from "@angular/core";
import packageJson from '../../package.json';

const version = packageJson.version;
export const APP_CONFIG = new InjectionToken<string>('APP_CONFIG');

export interface AppConfig {
  version: string;
  documentationUrl: string;
  sourceCodeUrl: string;
  fileEncoding: BufferEncoding;
}

export const appConfig: AppConfig = {
  version,
  documentationUrl: 'https://mkinitcpio.gitbook.io/car-maintenance',
  sourceCodeUrl: 'https://github.com/mkinitcpio/car-maintenance',
  fileEncoding: 'utf8',
};
