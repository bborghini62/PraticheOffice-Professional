// Centralized application logger with development-friendly behavior.

import { appConfig } from '../config';
import type { LogContext, LogMetadata } from './logging.types';

const formatMessage = (level: string, message: string, context?: LogContext, metadata?: LogMetadata) => {
  const payload = {
    level,
    message,
    context,
    metadata,
  };

  return payload;
};

export const logger = {
  debug: (message: string, context?: LogContext, metadata?: LogMetadata) => {
    if (!appConfig.isDevelopment) {
      return;
    }

    console.debug(formatMessage('debug', message, context, metadata));
  },
  info: (message: string, context?: LogContext, metadata?: LogMetadata) => {
    console.info(formatMessage('info', message, context, metadata));
  },
  warn: (message: string, context?: LogContext, metadata?: LogMetadata) => {
    console.warn(formatMessage('warn', message, context, metadata));
  },
  error: (message: string, context?: LogContext, metadata?: LogMetadata) => {
    console.error(formatMessage('error', message, context, metadata));
  },
};
