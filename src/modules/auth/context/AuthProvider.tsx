import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AuthSession, AuthUser, LoginCredentials } from '../auth.types';
import { authService } from '../services/authService';
import { AuthContext } from './authContext';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const restoredSession = await authService.restoreSession();
      setUser(restoredSession?.user ?? null);
      setIsLoading(false);
    };

    void initialize();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const session: AuthSession = await authService.login(credentials);
    setUser(session.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
