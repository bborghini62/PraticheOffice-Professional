// Central route definitions for the application.

import type { AppRouteConfig } from '../types';

export const appRoutes: AppRouteConfig = {
  dashboard: {
    path: '/',
    title: 'Dashboard',
  },
  settings: {
    path: '/settings',
    title: 'Settings',
  },
};
