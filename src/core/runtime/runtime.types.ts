// Runtime shared types for bootstrap, errors, and notifications.

export type NotificationSeverity = 'success' | 'info' | 'warning' | 'error';

export interface NotificationPayload {
  message: string;
  severity?: NotificationSeverity;
  autoHideDuration?: number;
}

export interface NotificationContextValue {
  showNotification: (payload: NotificationPayload) => void;
}
