export type ConfigStatus = 'idle' | 'initializing' | 'ready' | 'error' | 'closed';

export type ConfigKey =
  | 'app.name'
  | 'app.version'
  | 'app.locale'
  | 'app.timezone'
  | 'app.environment'
  | 'ui.defaultTheme'
  | 'ui.sidebarCollapsed'
  | 'notifications.autoHideDuration'
  | 'database.adapter'
  | 'database.schemaVersion'
  | 'cloud.defaultProvider'
  | 'logging.level';

export type ConfigValue = string | number | boolean;

export interface AppConfig {
  app: {
    name: string;
    version: string;
    locale: string;
    timezone: string;
    environment: string;
  };
  ui: {
    defaultTheme: string;
    sidebarCollapsed: boolean;
  };
  notifications: {
    autoHideDuration: number;
  };
  database: {
    adapter: string;
    schemaVersion: number;
  };
  cloud: {
    defaultProvider: string;
  };
  logging: {
    level: string;
  };
}

export type RuntimeConfigOverrides = Partial<Record<ConfigKey, ConfigValue>>;
