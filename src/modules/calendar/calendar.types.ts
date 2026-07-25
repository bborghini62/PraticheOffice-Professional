export type CalendarViewMode = 'month' | 'week' | 'agenda';

export type CalendarEventType = 'practice' | 'activity' | 'document' | 'deadline';

export interface CalendarEvent {
  id: string;
  type: CalendarEventType;
  title: string;
  description: string;
  date: string;
  time?: string;
  status: string;
  responsible: string;
  group: string;
  practiceId?: string;
  resourceId: string;
  practiceCode?: string;
  practiceTitle?: string;
  priority?: string;
  isOverdue: boolean;
  isToday: boolean;
  isUrgent: boolean;
}

export interface CalendarFiltersState {
  eventType: CalendarEventType | 'all';
  status: string;
  responsible: string;
  group: string;
  practiceId: string;
}
