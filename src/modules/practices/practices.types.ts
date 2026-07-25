export type PracticeStatus =
  | 'draft'
  | 'open'
  | 'in_progress'
  | 'waiting'
  | 'under_review'
  | 'approved'
  | 'completed'
  | 'archived'
  | 'cancelled';

export type PracticePriority = 'low' | 'normal' | 'high' | 'urgent';

export interface PracticeRecord {
  id: string;
  code: string;
  subject: string;
  status: PracticeStatus;
  priority: PracticePriority;
  clientId: string;
  responsible: string;
  group: string;
  dueDate: string;
  updatedAt: string;
}

export interface PracticesFilters {
  search: string;
  status: PracticeStatus | 'all';
  priority: PracticePriority | 'all';
  clientId: string | 'all';
}
