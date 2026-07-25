// Application bootstrap that wires runtime providers and lazy-loaded routing.

import { Suspense, lazy } from 'react';
import { AppErrorBoundary } from './AppErrorBoundary';
import { NotificationProvider } from './NotificationProvider';
import { AppLoading } from '../../shared/components/AppLoading';
import { initializeGlobalErrorHandler } from './GlobalErrorHandler';

const AppRouter = lazy(() => import('../router/AppRouter').then((module) => ({ default: module.AppRouter })));

initializeGlobalErrorHandler();

export const AppBootstrap = () => (
  <AppErrorBoundary>
    <NotificationProvider>
      <Suspense fallback={<AppLoading />}>
        <AppRouter />
      </Suspense>
    </NotificationProvider>
  </AppErrorBoundary>
);
