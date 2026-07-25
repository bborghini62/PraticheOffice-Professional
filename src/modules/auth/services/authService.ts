import type { AuthSession, AuthUser, LoginCredentials } from '../auth.types';
import { getUsers } from '../../users/services/usersService';

const storageKeys = {
  session: 'praticheoffice-auth-session',
  remember: 'praticheoffice-auth-remember',
};

const getStorage = (rememberMe: boolean) => (rememberMe ? localStorage : sessionStorage);

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
    storage.setItem(storageKeys.session, JSON.stringify(session));
    if (credentials.rememberMe) {
      storage.setItem(storageKeys.remember, 'true');
    } else {
      storage.removeItem(storageKeys.remember);
    }

    return session;
  },

  async restoreSession(): Promise<AuthSession | null> {
    const sessionStorageValue = sessionStorage.getItem(storageKeys.session);
    const localStorageValue = localStorage.getItem(storageKeys.session);
    const storedValue = localStorageValue ?? sessionStorageValue;

    if (!storedValue) {
      return null;
    }

    try {
      const parsed = JSON.parse(storedValue) as AuthSession;
      return parsed.user ? parsed : null;
    } catch {
      return null;
    }
  },

  async logout(): Promise<void> {
    sessionStorage.removeItem(storageKeys.session);
    localStorage.removeItem(storageKeys.session);
    localStorage.removeItem(storageKeys.remember);
  },
};
