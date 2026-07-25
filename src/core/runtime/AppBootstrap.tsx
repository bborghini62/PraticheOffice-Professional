// Application bootstrap that wires runtime providers and lazy-loaded routing.

import { Suspense, lazy, useEffect, useState } from 'react';
import { AppErrorBoundary } from './AppErrorBoundary';
import { NotificationProvider } from './NotificationProvider';
import { AppLoading } from '../../shared/components/AppLoading';
import { initializeGlobalErrorHandler } from './GlobalErrorHandler';
import { databaseService } from '../database';

const AppRouter = lazy(() => import('../router/AppRouter').then((module) => ({ default: module.AppRouter })));

initializeGlobalErrorHandler();

export const AppBootstrap = () => {
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [databaseError, setDatabaseError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await databaseService.initialize();
        setIsDatabaseReady(true);
      } catch (error) {
        setDatabaseError(error instanceof Error ? error : new Error('Database initialization failed'));
      }
    };

    void initializeDatabase();
  }, []);

  if (databaseError) {
    throw databaseError;
  }

  if (!isDatabaseReady) {
    return <AppLoading />;
  }

  return (
    <AppErrorBoundary>
      <NotificationProvider>
        <Suspense fallback={<AppLoading />}>
          <AppRouter />
        </Suspense>
      </NotificationProvider>
    </AppErrorBoundary>
  );
};
