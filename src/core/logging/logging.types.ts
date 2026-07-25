// Shared types for the centralized logger.

export interface LogContext {
  component?: string;
  [key: string]: unknown;
}

export interface LogMetadata {
  context?: LogContext;
  [key: string]: unknown;
}
