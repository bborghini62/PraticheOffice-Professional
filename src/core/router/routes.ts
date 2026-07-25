// Central route definitions for the application.

import type { AppRouteConfig } from '../types';

export const appRoutes: AppRouteConfig = {
  login: {
    path: '/login',
    title: 'Accesso',
  },
  dashboard: {
    path: '/',
    title: 'Cruscotto',
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
  calendar: {
    path: '/calendario',
    title: 'Calendario',
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
  report: {
    path: '/report',
    title: 'Report',
  },
  users: {
    path: '/utenti',
    title: 'Utenti',
  },
  newUser: {
    path: '/utenti/nuovo',
    title: 'Nuovo utente',
  },
  userDetail: {
    path: '/utenti/:userId',
    title: 'Scheda utente',
  },
  settings: {
    path: '/impostazioni',
    title: 'Impostazioni',
  },
  help: {
    path: '/aiuto',
    title: 'Aiuto',
  },
};
