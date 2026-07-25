export type ActivityStatus = 'todo' | 'in_progress' | 'blocked' | 'completed' | 'cancelled';

export type ActivityPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface ActivityRecord {
  id: string;
  code: string;
  title: string;
  description: string;
  practiceId: string;
  assignee: string;
  group: string;
  status: ActivityStatus;
  priority: ActivityPriority;
  startDate: string;
  dueDate: string;
  notes: string;
  updatedAt: string;
}

export interface ActivitiesFilters {
  search: string;
  status: ActivityStatus | 'all';
  priority: ActivityPriority | 'all';
  assignee: string | 'all';
  practiceId: string | 'all';
}
