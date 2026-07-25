import type { AuthSession, AuthUser, LoginCredentials } from '../auth.types';

const storageKeys = {
  session: 'praticheoffice-auth-session',
  remember: 'praticheoffice-auth-remember',
};

const demoUsers: AuthUser[] = [
  {
    id: 'admin-demo',
    email: 'amministratore@praticheoffice.local',
    name: 'Admin Demo',
    role: 'Amministratore',
  },
  {
    id: 'operator-demo',
    email: 'operatore@praticheoffice.local',
    name: 'Operatore Demo',
    role: 'Operatore',
  },
];

const passwords: Record<string, string> = {
  'amministratore@praticheoffice.local': 'Admin123!',
  'operatore@praticheoffice.local': 'Operatore123!',
};

const getStorage = (rememberMe: boolean) => (rememberMe ? localStorage : sessionStorage);

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const user = demoUsers.find((candidate) => candidate.email.toLowerCase() === credentials.email.trim().toLowerCase());

    if (!user) {
      throw new Error('Credenziali non valide. Controlla email e password.');
    }

    const expectedPassword = passwords[user.email];
    if (expectedPassword !== credentials.password) {
      throw new Error('Credenziali non valide. Controlla email e password.');
    }

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
