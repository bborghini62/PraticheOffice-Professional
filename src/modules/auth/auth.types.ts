export type AuthRole = 'Amministratore' | 'Operatore';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: AuthRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthSession {
  user: AuthUser;
}
