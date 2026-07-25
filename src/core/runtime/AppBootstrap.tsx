// Application bootstrap that wires runtime providers and lazy-loaded routing.

import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppErrorBoundary } from './AppErrorBoundary';
import { NotificationProvider } from './NotificationProvider';
import { AppLoading } from '../../shared/components/AppLoading';
import { initializeGlobalErrorHandler } from './GlobalErrorHandler';
import { databaseService } from '../database';
import { configService } from '../config';
import { AuthProvider } from '../../modules/auth/context/AuthProvider';

const AppRouter = lazy(() => import('../router/AppRouter').then((module) => ({ default: module.AppRouter })));

initializeGlobalErrorHandler();

export const AppBootstrap = () => {
  const [isRuntimeReady, setIsRuntimeReady] = useState(false);
  const [runtimeError, setRuntimeError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeRuntime = async () => {
      try {
        await configService.initialize();
        await databaseService.initialize();
        setIsRuntimeReady(true);
      } catch (error) {
        setRuntimeError(error instanceof Error ? error : new Error('Runtime initialization failed'));
      }
    };

    void initializeRuntime();
  }, []);

  if (runtimeError) {
    throw runtimeError;
  }

  if (!isRuntimeReady) {
    return <AppLoading />;
  }

  return (
    <AppErrorBoundary>
      <NotificationProvider>
        <AuthProvider>
          <Suspense fallback={<AppLoading />}>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </Suspense>
        </AuthProvider>
      </NotificationProvider>
    </AppErrorBoundary>
  );
};
