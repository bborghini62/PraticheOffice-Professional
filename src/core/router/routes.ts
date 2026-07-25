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
  newPractice: {
    path: '/pratiche/nuova',
    title: 'Nuova pratica',
  },
  practiceDetail: {
    path: '/pratiche/:practiceId',
    title: 'Dettaglio pratica',
  },
  settings: {
    path: '/settings',
    title: 'Settings',
  },
};
