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
  clients: {
    path: '/clienti',
    title: 'Clienti',
  },
  activities: {
    path: '/attivita',
    title: 'Attività',
  },
  newActivity: {
    path: '/attivita/nuova',
    title: 'Nuova attività',
  },
  practiceActivitiesNew: {
    path: '/pratiche/:practiceId/attivita/nuova',
    title: 'Nuova attività',
  },
  documents: {
    path: '/documenti',
    title: 'Documenti',
  },
  newDocument: {
    path: '/documenti/nuovo',
    title: 'Nuovo documento',
  },
  documentDetail: {
    path: '/documenti/:documentId',
    title: 'Scheda documento',
  },
  practiceDocumentsNew: {
    path: '/pratiche/:practiceId/documenti/nuovo',
    title: 'Nuovo documento',
  },
  newClient: {
    path: '/clienti/nuovo',
    title: 'Nuovo cliente',
  },
  clientDetail: {
    path: '/clienti/:clientId',
    title: 'Scheda cliente',
  },
  settings: {
    path: '/settings',
    title: 'Settings',
  },
};
