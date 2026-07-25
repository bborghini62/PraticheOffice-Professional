// Global notification provider built on Material UI Snackbar and Alert.

import { Alert, Snackbar } from '@mui/material';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { NotificationContextValue, NotificationPayload } from './runtime.types';
import { NotificationContext } from './notificationContext';

interface Props {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<NotificationPayload['severity']>('info');
  const [autoHideDuration, setAutoHideDuration] = useState(4000);

  const showNotification = useCallback((payload: NotificationPayload) => {
    setMessage(payload.message);
    setSeverity(payload.severity ?? 'info');
    setAutoHideDuration(payload.autoHideDuration ?? 4000);
    setOpen(true);
  }, []);

  const value = useMemo<NotificationContextValue>(() => ({ showNotification }), [showNotification]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

