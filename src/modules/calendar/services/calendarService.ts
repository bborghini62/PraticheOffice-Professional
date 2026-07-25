import { getActivities } from '../../activities/services/activitiesService';
import { getDocuments } from '../../documents/services/documentsService';
import { getPractices } from '../../practices/services/practicesService';
import type { CalendarEvent, CalendarFiltersState, CalendarViewMode } from '../calendar.types';

const toDateKey = (value: string): string => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString().slice(0, 10);
};

const normalizeStatus = (value: string): string => value;

const buildCalendarEvents = (): CalendarEvent[] => {
  const practices = getPractices();
  const activities = getActivities();
  const documents = getDocuments();

  const practiceEvents = practices.map((practice) => ({
    id: `practice-${practice.id}`,
    type: 'practice' as const,
    title: practice.subject,
    description: `Scadenza pratica ${practice.code}`,
    date: toDateKey(practice.dueDate),
    status: normalizeStatus(practice.status),
    responsible: practice.responsible,
    group: practice.group,
    practiceId: practice.id,
    resourceId: practice.id,
    practiceCode: practice.code,
    practiceTitle: practice.subject,
    priority: practice.priority,
    isOverdue: new Date(practice.dueDate) < new Date(),
    isToday: toDateKey(practice.dueDate) === new Date().toISOString().slice(0, 10),
    isUrgent: practice.priority === 'urgent',
  }));

  const activityEvents = activities.map((activity) => ({
    id: `activity-${activity.id}`,
    type: 'activity' as const,
    title: activity.title,
    description: activity.description,
    date: toDateKey(activity.startDate),
    time: '09:00',
    status: normalizeStatus(activity.status),
    responsible: activity.assignee,
    group: activity.group,
    practiceId: activity.practiceId,
    resourceId: activity.id,
    practiceCode: activity.practiceId,
    practiceTitle: activity.title,
    priority: activity.priority,
    isOverdue: new Date(activity.dueDate) < new Date(),
    isToday: toDateKey(activity.startDate) === new Date().toISOString().slice(0, 10),
    isUrgent: activity.priority === 'urgent',
  }));

  const activityDeadlineEvents = activities.map((activity) => ({
    id: `deadline-activity-${activity.id}`,
    type: 'deadline' as const,
    title: `Scadenza ${activity.title}`,
    description: `Scadenza attività ${activity.code}`,
    date: toDateKey(activity.dueDate),
    status: normalizeStatus(activity.status),
    responsible: activity.assignee,
    group: activity.group,
    practiceId: activity.practiceId,
    resourceId: activity.id,
    practiceCode: activity.practiceId,
    practiceTitle: activity.title,
    priority: activity.priority,
    isOverdue: new Date(activity.dueDate) < new Date(),
    isToday: toDateKey(activity.dueDate) === new Date().toISOString().slice(0, 10),
    isUrgent: activity.priority === 'urgent',
  }));

  const documentDeadlineEvents = documents.map((document) => ({
    id: `deadline-document-${document.id}`,
    type: 'deadline' as const,
    title: `Scadenza ${document.name}`,
    description: `Scadenza documento ${document.code}`,
    date: toDateKey(document.dueDate),
    status: normalizeStatus(document.status),
    responsible: document.owner,
    group: document.practiceId,
    practiceId: document.practiceId,
    resourceId: document.id,
    practiceCode: document.practiceId,
    practiceTitle: document.name,
    priority: 'normal',
    isOverdue: new Date(document.dueDate) < new Date(),
    isToday: toDateKey(document.dueDate) === new Date().toISOString().slice(0, 10),
    isUrgent: document.status === 'expired',
  }));

  const documentEvents = documents.map((document) => ({
    id: `document-${document.id}`,
    type: 'document' as const,
    title: document.name,
    description: document.description,
    date: toDateKey(document.documentDate),
    status: normalizeStatus(document.status),
    responsible: document.owner,
    group: document.practiceId,
    practiceId: document.practiceId,
    resourceId: document.id,
    practiceCode: document.practiceId,
    practiceTitle: document.name,
    priority: 'normal',
    isOverdue: new Date(document.dueDate) < new Date(),
    isToday: toDateKey(document.documentDate) === new Date().toISOString().slice(0, 10),
    isUrgent: document.status === 'expired',
  }));

  return [...practiceEvents, ...activityEvents, ...activityDeadlineEvents, ...documentEvents, ...documentDeadlineEvents];
};

export const getCalendarEvents = (): CalendarEvent[] => buildCalendarEvents();

export const getCalendarViewMode = (width: number): CalendarViewMode => {
  if (width < 768) {
    return 'agenda';
  }

  if (width < 1200) {
    return 'week';
  }

  return 'month';
};

export const filterCalendarEvents = (events: CalendarEvent[], filters: CalendarFiltersState): CalendarEvent[] => {
  return events.filter((event) => {
    const matchesType = filters.eventType === 'all' || event.type === filters.eventType;
    const matchesStatus = filters.status === 'all' || event.status.toLowerCase() === filters.status.toLowerCase();
    const matchesResponsible = filters.responsible === 'all' || event.responsible === filters.responsible;
    const matchesGroup = filters.group === 'all' || event.group === filters.group;
    const matchesPractice = filters.practiceId === 'all' || event.practiceId === filters.practiceId;

    return matchesType && matchesStatus && matchesResponsible && matchesGroup && matchesPractice;
  });
};

export const getDefaultCalendarFilters = (): CalendarFiltersState => ({
  eventType: 'all',
  status: 'all',
  responsible: 'all',
  group: 'all',
  practiceId: 'all',
});
