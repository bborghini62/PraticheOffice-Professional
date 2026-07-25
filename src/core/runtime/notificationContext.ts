// React context for the shared notification system.

import { createContext } from 'react';
import type { NotificationContextValue } from './runtime.types';

export const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);
