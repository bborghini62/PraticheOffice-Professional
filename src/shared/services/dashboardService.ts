// Shared service layer for dashboard and settings data.

import type { ActivityItem, DashboardMetric, SettingsPreference } from '../../models/dashboard';

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: 'cases',
    title: 'Open cases',
    value: '184',
    change: '+12% this month',
    accent: '#2563eb',
  },
  {
    id: 'completion',
    title: 'Completion rate',
    value: '91%',
    change: '+4.2% vs last week',
    accent: '#0f766e',
  },
  {
    id: 'review',
    title: 'Pending review',
    value: '27',
    change: '5 urgent',
    accent: '#b45309',
  },
  {
    id: 'efficiency',
    title: 'Avg. turnaround',
    value: '2.3d',
    change: '-18% faster',
    accent: '#7c3aed',
  },
];

export const recentActivities: ActivityItem[] = [
  {
    id: 'a1',
    title: 'Policy update approved',
    detail: 'Final review completed for the procurement workflow.',
    time: '10 min ago',
    status: 'Completed',
  },
  {
    id: 'a2',
    title: 'Document package assigned',
    detail: 'Three new submissions routed to the legal team.',
    time: '42 min ago',
    status: 'In progress',
  },
  {
    id: 'a3',
    title: 'Compliance checkpoint',
    detail: 'Scheduled verification for the regional archive.',
    time: 'Today, 14:30',
    status: 'Scheduled',
  },
];

export const settingsPreferences: SettingsPreference[] = [
  {
    id: 'notifications',
    title: 'Notification center',
    description: 'Receive timely alerts for urgent case updates and deadlines.',
    enabled: true,
  },
  {
    id: 'automation',
    title: 'Automation rules',
    description: 'Enable guided routing and reminder rules for recurring requests.',
    enabled: true,
  },
  {
    id: 'audit',
    title: 'Audit trail visibility',
    description: 'Make every action visible in the internal review workspace.',
    enabled: false,
  },
];
