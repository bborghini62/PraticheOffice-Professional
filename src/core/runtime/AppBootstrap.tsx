// Application bootstrap that wires runtime providers and lazy-loaded routing.

import { Suspense, lazy, useEffect, useState } from 'react';
import { AppErrorBoundary } from './AppErrorBoundary';
import { NotificationProvider } from './NotificationProvider';
import { AppLoading } from '../../shared/components/AppLoading';
import { initializeGlobalErrorHandler } from './GlobalErrorHandler';
import { databaseService } from '../database';
import { configService } from '../config';

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
        <Suspense fallback={<AppLoading />}>
          <AppRouter />
        </Suspense>
      </NotificationProvider>
    </AppErrorBoundary>
  );
};
