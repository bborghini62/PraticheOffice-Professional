import { environment } from './environment';
import type { AppConfig } from './config.types';

export const defaultConfig: AppConfig = {
  app: {
    name: 'PraticheOffice Professional',
    version: '0.1.0-alpha.1',
    locale: 'it-IT',
    timezone: 'Europe/Rome',
    environment: environment.appEnv,
  },
  ui: {
    defaultTheme: 'light',
    sidebarCollapsed: false,
  },
  notifications: {
    autoHideDuration: 4000,
  },
  database: {
    adapter: 'in-memory',
    schemaVersion: 1,
  },
  cloud: {
    defaultProvider: 'local',
  },
  logging: {
    level: environment.appEnv === 'development' ? 'debug' : 'info',
  },
};
