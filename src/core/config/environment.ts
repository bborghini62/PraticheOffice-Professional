// Typed environment access for the application runtime.

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string | undefined;
  readonly VITE_APP_NAME: string | undefined;
  readonly VITE_APP_VERSION: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const env = import.meta.env as unknown as ImportMeta['env'];

export const environment = {
  appEnv: env.VITE_APP_ENV ?? 'development',
  appName: env.VITE_APP_NAME ?? 'PraticheOffice Professional',
  appVersion: env.VITE_APP_VERSION ?? '0.1.0-alpha.1',
};
