import type { CloudConfig } from './cloud.types';

const STORAGE_KEY = 'praticheoffice-google-cloud-config-v1';

const emptyConfig: CloudConfig = {
  webAppUrl: '',
  googleClientId: '',
};

export const normalizeWebAppUrl = (value: string): string => value.trim().replace(/\/+$/, '');

export const loadCloudConfig = (): CloudConfig => {
  if (typeof window === 'undefined') {
    return { ...emptyConfig };
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (!storedValue) {
    return { ...emptyConfig };
  }

  try {
    const parsed = JSON.parse(storedValue) as Partial<CloudConfig>;
    return {
      webAppUrl: normalizeWebAppUrl(parsed.webAppUrl ?? ''),
      googleClientId: (parsed.googleClientId ?? '').trim(),
    };
  } catch {
    return { ...emptyConfig };
  }
};

export const saveCloudConfig = (config: CloudConfig): CloudConfig => {
  const normalized: CloudConfig = {
    webAppUrl: normalizeWebAppUrl(config.webAppUrl),
    googleClientId: config.googleClientId.trim(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
};

export const clearCloudConfig = (): void => {
  window.localStorage.removeItem(STORAGE_KEY);
};
