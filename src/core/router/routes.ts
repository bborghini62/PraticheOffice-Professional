// Central route definitions for the application.

import type { AppRouteConfig } from '../types';

export const appRoutes: AppRouteConfig = {
  dashboard: {
    path: '/',
    title: 'Dashboard',
  },
  practices: {
    path: '/pratiche',
    title: 'Pratiche',
  },
  settings: {
    path: '/settings',
    title: 'Settings',
  },
};
