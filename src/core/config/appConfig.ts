// Central application configuration values used by the runtime.

import { environment } from './environment';

export const appConfig = {
  appName: environment.appName,
  version: environment.appVersion,
  environment: environment.appEnv,
  isDevelopment: environment.appEnv === 'development',
  isProduction: environment.appEnv === 'production',
};
