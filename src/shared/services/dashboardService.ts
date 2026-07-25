// Shared service layer for dashboard and settings data.

import type { ActivityItem, DashboardMetric, SettingsPreference } from '../../models/dashboard';

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: 'cases',
    title: 'Pratiche aperte',
    value: '184',
    change: '+12% rispetto al mese scorso',
    accent: '#2563eb',
  },
  {
    id: 'completion',
    title: 'Percentuale di completamento',
    value: '91%',
    change: '+4,2% rispetto alla scorsa settimana',
    accent: '#0f766e',
  },
  {
    id: 'review',
    title: 'In revisione',
    value: '27',
    change: '5 urgenti',
    accent: '#b45309',
  },
  {
    id: 'efficiency',
    title: 'Tempi medi',
    value: '2,3g',
    change: '-18% rispetto al mese scorso',
    accent: '#7c3aed',
  },
];

export const recentActivities: ActivityItem[] = [
  {
    id: 'a1',
    title: 'Aggiornamento approvato',
    detail: 'Revisionato il flusso di approvazione della pratica di procurement.',
    time: '10 minuti fa',
    status: 'Completed',
  },
  {
    id: 'a2',
    title: 'Package documenti assegnato',
    detail: 'Tre nuove pratiche inviate al team legale.',
    time: '42 minuti fa',
    status: 'In progress',
  },
  {
    id: 'a3',
    title: 'Controllo di conformità',
    detail: 'Verifica programmata per l’archivio regionale.',
    time: 'Oggi, 14:30',
    status: 'Scheduled',
  },
];

export const settingsPreferences: SettingsPreference[] = [
  {
    id: 'notifications',
    title: 'Centro notifiche',
    description: 'Ricevi avvisi tempestivi per aggiornamenti urgenti e scadenze.',
    enabled: true,
  },
  {
    id: 'automation',
    title: 'Regole di automazione',
    description: 'Attiva routing guidato e promemoria per i flussi ricorrenti.',
    enabled: true,
  },
  {
    id: 'audit',
    title: 'Visibilità cronologia',
    description: 'Rendi visibili tutte le azioni nel flusso di revisione interno.',
    enabled: false,
  },
];
