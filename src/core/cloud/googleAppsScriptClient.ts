import { normalizeWebAppUrl } from './cloudConfig';
import { clearGoogleIdToken, getGoogleIdToken } from './cloudSession';
import type { CloudApiResponse, CloudConfig, CloudHealthData } from './cloud.types';

class CloudRequestError extends Error {
  readonly code?: string;
  readonly requestId?: string;

  constructor(message: string, options?: { code?: string; requestId?: string }) {
    super(message);
    this.name = 'CloudRequestError';
    this.code = options?.code;
    this.requestId = options?.requestId;
  }
}

export const isCloudAuthError = (error: unknown): boolean => {
  if (!(error instanceof CloudRequestError)) {
    return false;
  }

  return error.code === 'AUTH_REQUIRED' || error.code === 'INVALID_GOOGLE_TOKEN';
};

const createRequestId = (): string =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `req-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const parseResponse = async <T>(response: Response): Promise<CloudApiResponse<T>> => {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Error('Il servizio cloud ha restituito una risposta non valida.');
  }

  const parsed = body as CloudApiResponse<T>;
  if (!response.ok || !parsed.ok) {
    const code = parsed.error?.code;
    const message = parsed.error?.message ?? `Errore cloud HTTP ${response.status}.`;

    if (code === 'AUTH_REQUIRED' || code === 'INVALID_GOOGLE_TOKEN') {
      clearGoogleIdToken();
      throw new CloudRequestError('Sessione Google scaduta o non valida. Vai in Impostazioni e accedi di nuovo con Google.', {
        code,
        requestId: parsed.requestId,
      });
    }

    throw new CloudRequestError(message, { code, requestId: parsed.requestId });
  }

  return parsed;
};

export const testGoogleCloudConnection = async (config: CloudConfig): Promise<CloudHealthData> => {
  const webAppUrl = normalizeWebAppUrl(config.webAppUrl);
  if (!webAppUrl) {
    throw new Error('Inserisci prima l’indirizzo della Web App Google Apps Script.');
  }

  const url = new URL(webAppUrl);
  url.searchParams.set('action', 'health');
  url.searchParams.set('_', Date.now().toString());

  const response = await fetch(url.toString(), {
    method: 'GET',
    cache: 'no-store',
    redirect: 'follow',
  });
  const parsed = await parseResponse<CloudHealthData>(response);
  if (!parsed.data) {
    throw new Error('Il servizio cloud non ha restituito i dati di stato.');
  }
  return parsed.data;
};

export const callGoogleCloud = async <T>(
  config: CloudConfig,
  action: string,
  payload: Record<string, unknown>,
  idToken?: string,
): Promise<T> => {
  const webAppUrl = normalizeWebAppUrl(config.webAppUrl);
  if (!webAppUrl) {
    throw new Error('Configurazione cloud mancante.');
  }
  const resolvedToken = idToken ?? getGoogleIdToken();
  if (!resolvedToken) {
    throw new CloudRequestError('Sessione Google mancante o scaduta. Vai in Impostazioni e accedi con Google.', {
      code: 'AUTH_REQUIRED',
    });
  }

  const requestId = createRequestId();
  const response = await fetch(webAppUrl, {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({ action, payload, idToken: resolvedToken, requestId }),
  });

  const parsed = await parseResponse<T>(response);
  if (parsed.data === undefined) {
    throw new Error('Il servizio cloud non ha restituito i dati richiesti.');
  }
  return parsed.data;
};
