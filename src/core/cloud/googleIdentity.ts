interface GoogleCredentialResponse {
  credential?: string;
}

interface GoogleAccountsId {
  initialize: (options: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  renderButton: (parent: HTMLElement, options: {
    type: 'standard';
    theme: 'outline';
    size: 'large';
    text: 'signin_with';
    shape: 'rectangular';
    logo_alignment: 'left';
  }) => void;
  disableAutoSelect: () => void;
  revoke: (hint: string, callback: () => void) => void;
}

interface GoogleApi {
  accounts: {
    id: GoogleAccountsId;
  };
}

declare global {
  interface Window {
    google?: GoogleApi;
    __praticheOfficeGisInitializedClientId?: string;
  }
}

const GIS_SCRIPT_ID = 'google-identity-services-client';
const GIS_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';
const OAUTH_ALLOWED_ORIGINS = new Set(['http://localhost:5173', 'http://127.0.0.1:5173']);

type GoogleIdentityErrorCode =
  | 'CLIENT_ID_MISSING'
  | 'BUTTON_NOT_LOADED'
  | 'ORIGIN_NOT_AUTHORIZED'
  | 'ACCESS_CANCELLED'
  | 'CREDENTIAL_MISSING'
  | 'SCRIPT_LOAD_FAILED';

export class GoogleIdentityError extends Error {
  code: GoogleIdentityErrorCode;

  constructor(code: GoogleIdentityErrorCode, message: string) {
    super(message);
    this.name = 'GoogleIdentityError';
    this.code = code;
  }
}

interface RenderGoogleSignInButtonOptions {
  container: HTMLElement;
  googleClientId: string;
  onCredential: (credential: string) => void;
  onError?: (error: Error) => void;
}

let gisLoadPromise: Promise<void> | null = null;
let initializedClientId: string | null = null;
let credentialHandler: ((credential: string) => void) | null = null;
let errorHandler: ((error: Error) => void) | null = null;

const getOrigin = (): string => {
  if (typeof window === 'undefined') {
    return 'origine sconosciuta';
  }

  return window.location.origin;
};

const createOriginNotAuthorizedError = (): GoogleIdentityError => {
  const origin = getOrigin();

  return new GoogleIdentityError('ORIGIN_NOT_AUTHORIZED', `Origine non autorizzata nel client OAuth Google: ${origin}`);
};

const assertOriginIsAuthorized = (): void => {
  const origin = getOrigin();
  if (!OAUTH_ALLOWED_ORIGINS.has(origin)) {
    throw createOriginNotAuthorizedError();
  }
};

const reportCredentialError = (error: Error): void => {
  if (!errorHandler) {
    return;
  }

  errorHandler(error);
};

const ensureGoogleIdInitialized = (clientId: string): void => {
  const windowInitializedClientId = window.__praticheOfficeGisInitializedClientId;
  if (initializedClientId === clientId || windowInitializedClientId === clientId) {
    initializedClientId = clientId;
    return;
  }

  window.google!.accounts.id.initialize({
    client_id: clientId,
    auto_select: false,
    cancel_on_tap_outside: false,
    callback: (response) => {
      const credential = response.credential?.trim();
      if (!credential) {
        reportCredentialError(new GoogleIdentityError('CREDENTIAL_MISSING', 'Google non ha restituito una credential valida.'));
        return;
      }

      if (!credentialHandler) {
        return;
      }

      credentialHandler(credential);
    },
  });

  initializedClientId = clientId;
  window.__praticheOfficeGisInitializedClientId = clientId;
};

const ensureGoogleButtonRendered = (container: HTMLElement): void => {
  if (container.childElementCount > 0) {
    return;
  }

  throw new GoogleIdentityError('BUTTON_NOT_LOADED', 'Pulsante Google non caricato. Riprova tra qualche secondo.');
};

export const loadGoogleIdentityScript = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    throw new GoogleIdentityError('SCRIPT_LOAD_FAILED', 'Google Identity Services non disponibile in questo ambiente.');
  }

  if (window.google?.accounts?.id) {
    return;
  }

  if (!gisLoadPromise) {
    gisLoadPromise = new Promise<void>((resolve, reject) => {
      const existing = document.getElementById(GIS_SCRIPT_ID) as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new GoogleIdentityError('SCRIPT_LOAD_FAILED', 'Impossibile caricare Google Identity Services.')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = GIS_SCRIPT_ID;
      script.src = GIS_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new GoogleIdentityError('SCRIPT_LOAD_FAILED', 'Impossibile caricare Google Identity Services.'));
      document.head.appendChild(script);
    });
  }

  await gisLoadPromise;

  if (!window.google?.accounts?.id) {
    throw new GoogleIdentityError('SCRIPT_LOAD_FAILED', 'Google Identity Services non inizializzato correttamente.');
  }
};

export const renderGoogleSignInButton = async ({
  container,
  googleClientId,
  onCredential,
  onError,
}: RenderGoogleSignInButtonOptions): Promise<void> => {
  const normalizedClientId = googleClientId.trim();
  if (!normalizedClientId) {
    throw new GoogleIdentityError('CLIENT_ID_MISSING', 'Google OAuth Client ID mancante. Configuralo nelle Impostazioni Cloud.');
  }

  assertOriginIsAuthorized();
  await loadGoogleIdentityScript();

  credentialHandler = onCredential;
  errorHandler = onError ?? null;
  ensureGoogleIdInitialized(normalizedClientId);

  container.replaceChildren();

  try {
    window.google!.accounts.id.renderButton(container, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
    });
  } catch {
    throw new GoogleIdentityError('BUTTON_NOT_LOADED', 'Pulsante Google non caricato. Riprova tra qualche secondo.');
  }

  ensureGoogleButtonRendered(container);
};

export const disconnectGoogleIdentity = async (email?: string): Promise<void> => {
  await loadGoogleIdentityScript();
  window.google!.accounts.id.disableAutoSelect();

  if (!email) {
    return;
  }

  await new Promise<void>((resolve) => {
    window.google!.accounts.id.revoke(email, () => resolve());
  });
};
