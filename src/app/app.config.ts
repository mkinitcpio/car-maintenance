import { InjectionToken } from "@angular/core";
import packageJson from '../../package.json';
import { AppConfig as EnvironmentConfig } from '../environments/environment';

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
  documentationUrl: EnvironmentConfig.links.documentation,
  sourceCodeUrl: EnvironmentConfig.links.sourceCode,
  fileEncoding: 'utf8',
};
