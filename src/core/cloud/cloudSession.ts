import type { CloudSession, GoogleCredentialPayload } from './cloud.types';

const CLOUD_SESSION_STORAGE_KEY = 'praticheoffice-google-cloud-session-v1';

const normalizeBase64Url = (value: string): string => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padLength = (4 - (base64.length % 4)) % 4;
  return base64 + '='.repeat(padLength);
};

const parseJwtPayload = (idToken: string): GoogleCredentialPayload => {
  const parts = idToken.split('.');
  if (parts.length < 2) {
    throw new Error('Token Google non valido.');
  }

  try {
    return JSON.parse(atob(normalizeBase64Url(parts[1]))) as GoogleCredentialPayload;
  } catch {
    throw new Error('Token Google non valido.');
  }
};

const parseJwtExpiry = (idToken: string): number | null => {
  const payload = parseJwtPayload(idToken);
  if (typeof payload.exp === 'number' && Number.isFinite(payload.exp)) {
    return payload.exp * 1000;
  }

  return null;
};

const loadSession = (): CloudSession | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(CLOUD_SESSION_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored) as CloudSession;
    if (!parsed.idToken || !parsed.email || !parsed.name) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const saveGoogleIdToken = (idToken: string): CloudSession => {
  const normalizedToken = idToken.trim();
  const payload = parseJwtPayload(normalizedToken);

  if (!payload.email || !payload.name) {
    throw new Error('Token Google privo di dati utente.');
  }

  const session: CloudSession = {
    idToken: normalizedToken,
    email: String(payload.email),
    name: String(payload.name),
    expiresAt: parseJwtExpiry(normalizedToken),
    updatedAt: Date.now(),
  };

  window.localStorage.setItem(CLOUD_SESSION_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('praticheoffice:cloud-session-changed'));
  return session;
};

export const clearGoogleIdToken = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(CLOUD_SESSION_STORAGE_KEY);
  window.dispatchEvent(new Event('praticheoffice:cloud-session-changed'));
};

export const getGoogleCloudSession = (): CloudSession | null => {
  const session = loadSession();
  if (!session) {
    return null;
  }

  if (session.expiresAt !== null && session.expiresAt <= Date.now()) {
    clearGoogleIdToken();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('praticheoffice:cloud-session-changed'));
    }
    return null;
  }

  return session;
};

export const getGoogleIdToken = (): string | null => getGoogleCloudSession()?.idToken ?? null;

export const hasGoogleCloudSession = (): boolean => Boolean(getGoogleCloudSession()?.idToken);

export const isGoogleCloudSessionExpired = (): boolean => {
  const session = loadSession();
  if (!session || session.expiresAt === null) {
    return false;
  }

  const expired = session.expiresAt <= Date.now();
  if (expired) {
    clearGoogleIdToken();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('praticheoffice:cloud-session-changed'));
    }
  }
  return expired;
};
