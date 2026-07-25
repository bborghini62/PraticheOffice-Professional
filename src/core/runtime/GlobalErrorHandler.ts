// Global error handler for unhandled browser errors and promise rejections.

import { logger } from '../logging';

let initialized = false;

export const initializeGlobalErrorHandler = () => {
  if (initialized) {
    return;
  }

  const handleError = (event: ErrorEvent | Event, source?: string, lineno?: number, colno?: number, error?: Error) => {
    logger.error('Unhandled runtime error', { component: 'GlobalErrorHandler' }, { event, source, lineno, colno, error });
    return false;
  };

  window.addEventListener('error', (event) => {
    handleError(event, event.filename, event.lineno, event.colno, event.error as Error | undefined);
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    logger.error('Unhandled promise rejection', { component: 'GlobalErrorHandler' }, { reason });
  });

  initialized = true;
};
