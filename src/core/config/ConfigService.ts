import { logger } from '../logging';
import type { AppConfig, ConfigKey, ConfigStatus, ConfigValue, RuntimeConfigOverrides } from './config.types';
import { defaultConfig } from './defaultConfig';
import { environment } from './environment';

export class ConfigService {
  private static instance: ConfigService | null = null;
  private status: ConfigStatus = 'idle';
  private readonly defaults: AppConfig = defaultConfig;
  private readonly environmentValues: Partial<AppConfig> = this.buildEnvironmentValues();
  private runtimeValues: RuntimeConfigOverrides = {};

  private constructor() {
    // Intentionally empty; initialization is explicit.
  }

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }

    return ConfigService.instance;
  }

  async initialize(): Promise<void> {
    if (this.status === 'initializing' || this.status === 'ready') {
      return;
    }

    this.status = 'initializing';

    try {
      this.runtimeValues = {};
      this.status = 'ready';
      logger.info('Configuration initialized', { component: 'ConfigService' }, { config: this.getAll() });
    } catch (error) {
      this.status = 'error';
      logger.error('Configuration initialization failed', { component: 'ConfigService' }, { error });
      throw error;
    }
  }

  get<TValue extends ConfigValue = ConfigValue>(key: ConfigKey): TValue {
    this.ensureReady();
    const value = this.resolveValue(key);

    if (value === undefined) {
      throw new Error(`Configuration key not found: ${key}`);
    }

    return value as TValue;
  }

  getAll(): AppConfig {
    this.ensureReady();
    return this.mergeConfig();
  }

  setRuntimeValue(key: ConfigKey, value: ConfigValue): void {
    this.ensureReady();
    this.runtimeValues[key] = value;
  }

  resetRuntimeValues(): void {
    this.ensureReady();
    this.runtimeValues = {};
  }

  isInitialized(): boolean {
    return this.status === 'ready';
  }

  private ensureReady(): void {
    if (!this.isInitialized()) {
      throw new Error('Config service is not initialized');
    }
  }

  private resolveValue(key: ConfigKey): ConfigValue | undefined {
    const runtimeValue = this.runtimeValues[key];
    if (runtimeValue !== undefined) {
      return runtimeValue;
    }

    const envValue = this.getEnvironmentValue(key);
    if (envValue !== undefined) {
      return envValue;
    }

    return this.getDefaultValue(key);
  }

  private getDefaultValue(key: ConfigKey): ConfigValue | undefined {
    switch (key) {
      case 'app.name':
        return this.defaults.app.name;
      case 'app.version':
        return this.defaults.app.version;
      case 'app.locale':
        return this.defaults.app.locale;
      case 'app.timezone':
        return this.defaults.app.timezone;
      case 'app.environment':
        return this.defaults.app.environment;
      case 'ui.defaultTheme':
        return this.defaults.ui.defaultTheme;
      case 'ui.sidebarCollapsed':
        return this.defaults.ui.sidebarCollapsed;
      case 'notifications.autoHideDuration':
        return this.defaults.notifications.autoHideDuration;
      case 'database.adapter':
        return this.defaults.database.adapter;
      case 'database.schemaVersion':
        return this.defaults.database.schemaVersion;
      case 'cloud.defaultProvider':
        return this.defaults.cloud.defaultProvider;
      case 'logging.level':
        return this.defaults.logging.level;
      case 'persistence.type':
        return this.defaults.persistence.type;
      default:
        return undefined;
    }
  }

  private getEnvironmentValue(key: ConfigKey): ConfigValue | undefined {
    switch (key) {
      case 'app.name':
        return this.environmentValues.app?.name;
      case 'app.version':
        return this.environmentValues.app?.version;
      case 'app.locale':
        return this.environmentValues.app?.locale;
      case 'app.timezone':
        return this.environmentValues.app?.timezone;
      case 'app.environment':
        return this.environmentValues.app?.environment;
      case 'ui.defaultTheme':
        return this.environmentValues.ui?.defaultTheme;
      case 'ui.sidebarCollapsed':
        return this.environmentValues.ui?.sidebarCollapsed;
      case 'notifications.autoHideDuration':
        return this.environmentValues.notifications?.autoHideDuration;
      case 'database.adapter':
        return this.environmentValues.database?.adapter;
      case 'database.schemaVersion':
        return this.environmentValues.database?.schemaVersion;
      case 'cloud.defaultProvider':
        return this.environmentValues.cloud?.defaultProvider;
      case 'logging.level':
        return this.environmentValues.logging?.level;
      case 'persistence.type':
        return this.environmentValues.persistence?.type;
      default:
        return undefined;
    }
  }

  private buildEnvironmentValues(): Partial<AppConfig> {
    return {
      app: {
        name: environment.appName,
        version: environment.appVersion,
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
      persistence: {
        type: 'InMemory',
      },
    };
  }

  private mergeConfig(): AppConfig {
    return {
      app: {
        name: this.get('app.name') as string,
        version: this.get('app.version') as string,
        locale: this.get('app.locale') as string,
        timezone: this.get('app.timezone') as string,
        environment: this.get('app.environment') as string,
      },
      ui: {
        defaultTheme: this.get('ui.defaultTheme') as string,
        sidebarCollapsed: this.get('ui.sidebarCollapsed') as boolean,
      },
      notifications: {
        autoHideDuration: this.get('notifications.autoHideDuration') as number,
      },
      database: {
        adapter: this.get('database.adapter') as string,
        schemaVersion: this.get('database.schemaVersion') as number,
      },
      cloud: {
        defaultProvider: this.get('cloud.defaultProvider') as string,
      },
      logging: {
        level: this.get('logging.level') as string,
      },
      persistence: {
        type: this.get('persistence.type') as string,
      },
    };
  }
}

export const configService = ConfigService.getInstance();
