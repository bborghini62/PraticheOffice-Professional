// Shared domain model definitions for dashboard and settings features.

export interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  accent: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  status: 'Completed' | 'In progress' | 'Scheduled';
}

export interface SettingsPreference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}
