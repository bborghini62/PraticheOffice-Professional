import type { ActivityPriority, ActivityStatus } from '../activities/activities.types';
import type { ClientStatus } from '../clients/clients.types';
import type { DocumentStatus } from '../documents/documents.types';
import type { PracticePriority, PracticeStatus } from '../practices/practices.types';
import type { UserRole } from '../users/users.types';

export type DashboardPeriod = 'today' | '7days' | '30days';

export interface DashboardFilters {
  period: DashboardPeriod;
  responsible: string | 'all';
  group: string | 'all';
}

export interface DashboardKpi {
  id: string;
  title: string;
  value: number;
  subtitle: string;
}

export interface DashboardDeadlineItem {
  id: string;
  kind: 'practice' | 'activity' | 'document';
  title: string;
  subtitle: string;
  dueDate: string;
  priority?: PracticePriority | ActivityPriority;
  status?: PracticeStatus | ActivityStatus | ClientStatus | DocumentStatus;
  isOverdue: boolean;
  isToday: boolean;
  isWithinThreeDays: boolean;
  isUrgent: boolean;
}

export interface DashboardActivityItem {
  id: string;
  title: string;
  practiceId: string;
  practiceCode: string;
  practiceSubject: string;
  assignee: string;
  priority: ActivityPriority;
  dueDate: string;
  status: ActivityStatus;
}

export interface DashboardPracticeItem {
  id: string;
  code: string;
  subject: string;
  clientName: string;
  responsible: string;
  status: PracticeStatus;
  updatedAt: string;
}

export interface DashboardTimelineItem {
  id: string;
  practiceId: string;
  practiceCode: string;
  title: string;
  userName: string;
  createdAt: string;
}

export interface DashboardWorkloadItem {
  id: string;
  userName: string;
  group: string;
  openActivities: number;
  urgentActivities: number;
  assignedPractices: number;
  role: UserRole;
}
