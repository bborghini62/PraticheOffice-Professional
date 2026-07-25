import type { AuthSession, AuthUser, LoginCredentials } from '../auth.types';
import { getUsers } from '../../users/services/usersService';

const storageKeys = {
  session: 'praticheoffice-auth-session',
  remember: 'praticheoffice-auth-remember',
};

const getStorage = (rememberMe: boolean) => (rememberMe ? localStorage : sessionStorage);

const clearStoredSessions = () => {
  sessionStorage.removeItem(storageKeys.session);
  sessionStorage.removeItem(storageKeys.remember);
  localStorage.removeItem(storageKeys.session);
  localStorage.removeItem(storageKeys.remember);
};

const readSessionFromStorage = (storage: Storage | null) => {
  if (!storage) {
    return null;
  }

  const storedValue = storage.getItem(storageKeys.session);
  if (!storedValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(storedValue) as AuthSession;
    return parsed.user ? parsed : null;
  } catch {
    return null;
  }
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const userRecord = getUsers().find((candidate) => candidate.email.toLowerCase() === credentials.email.trim().toLowerCase());

    if (!userRecord || !userRecord.isDemoUser) {
      throw new Error('Credenziali non valide. Controlla email e password.');
    }

    if (userRecord.password !== credentials.password) {
      throw new Error('Credenziali non valide. Controlla email e password.');
    }

    const user: AuthUser = {
      id: userRecord.id,
      email: userRecord.email,
      name: userRecord.displayName,
      role: userRecord.role === 'Administrator' ? 'Amministratore' : 'Operatore',
    };

    const session: AuthSession = { user };
    const storage = getStorage(credentials.rememberMe);
    const oppositeStorage = credentials.rememberMe ? sessionStorage : localStorage;

    storage.setItem(storageKeys.session, JSON.stringify(session));
    if (credentials.rememberMe) {
      localStorage.setItem(storageKeys.remember, 'true');
      sessionStorage.removeItem(storageKeys.session);
      sessionStorage.removeItem(storageKeys.remember);
    } else {
      sessionStorage.setItem(storageKeys.session, JSON.stringify(session));
      localStorage.removeItem(storageKeys.session);
      localStorage.removeItem(storageKeys.remember);
    }

    oppositeStorage.removeItem(storageKeys.session);
    oppositeStorage.removeItem(storageKeys.remember);

    return session;
  },

  async restoreSession(): Promise<AuthSession | null> {
    const rememberEnabled = localStorage.getItem(storageKeys.remember) === 'true';

    if (rememberEnabled) {
      return readSessionFromStorage(localStorage);
    }

    return readSessionFromStorage(sessionStorage);
  },

  async logout(): Promise<void> {
    clearStoredSessions();
  },
};
