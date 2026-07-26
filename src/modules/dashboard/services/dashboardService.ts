import { useMemo } from 'react';
import { getClients, getClientDisplayName } from '../../clients/services/clientsService';
import { getActivities } from '../../activities/services/activitiesService';
import { getDocuments } from '../../documents/services/documentsService';
import { getPractices } from '../../practices/services/practicesService';
import { getEventsByPracticeId } from '../../timeline/services/timelineService';
import { getUsers } from '../../users/services/usersService';
import type { DashboardActivityItem, DashboardDeadlineItem, DashboardFilters, DashboardKpi, DashboardPracticeItem, DashboardTimelineItem, DashboardWorkloadItem } from '../dashboard.types';
import type { UserRecord } from '../../users/users.types';

type DashboardUserLike = Pick<UserRecord, 'role' | 'displayName' | 'group'>;

const normalizeDate = (value: string) => new Date(`${value}T00:00:00`);
const today = new Date();
today.setHours(0, 0, 0, 0);

const getDateInRange = (date: Date, period: DashboardFilters['period']) => {
  const end = new Date(today);
  if (period === 'today') {
    end.setDate(today.getDate());
    return date >= today && date <= end;
  }
  if (period === '7days') {
    end.setDate(today.getDate() + 7);
    return date >= today && date <= end;
  }
  end.setDate(today.getDate() + 30);
  return date >= today && date <= end;
};

const getVisibilityScope = (user: DashboardUserLike | null) => {
  if (!user) {
    return { role: 'Viewer' as const, group: undefined, responsible: undefined };
  }

  if (user.role === 'Administrator') {
    return { role: user.role, group: undefined, responsible: undefined };
  }

  return { role: user.role, group: user.group, responsible: user.displayName };
};

export const filterDashboardData = (filters: DashboardFilters, user: DashboardUserLike | null) => {
  const scope = getVisibilityScope(user);
  const practices = getPractices().filter((practice) => {
    if (scope.role === 'Administrator') {
      return true;
    }
    if (scope.group && practice.group === scope.group) {
      return true;
    }
    return scope.responsible ? practice.responsible === scope.responsible : false;
  });

  const activities = getActivities().filter((activity) => {
    if (scope.role === 'Administrator') {
      return true;
    }
    if (scope.group && activity.group === scope.group) {
      return true;
    }
    return scope.responsible ? activity.assignee === scope.responsible : false;
  });

  const documents = getDocuments().filter((document) => {
    if (scope.role === 'Administrator') {
      return true;
    }
    const practice = practices.find((entry) => entry.id === document.practiceId);
    return Boolean(practice);
  });

  const clients = getClients().filter((client) => {
    if (scope.role === 'Administrator') {
      return true;
    }
    const hasLinkedPractice = practices.some((practice) => practice.clientId === client.id);
    return hasLinkedPractice;
  });

  const users = getUsers().filter((candidate) => {
    if (scope.role === 'Administrator') {
      return true;
    }
    if (scope.group) {
      return candidate.group === scope.group || candidate.displayName === scope.responsible;
    }
    return candidate.displayName === scope.responsible;
  });

  const byResponsible = filters.responsible === 'all' ? undefined : filters.responsible;
  const byGroup = filters.group === 'all' ? undefined : filters.group;

  const filteredPractices = practices.filter((practice) => {
    if (byResponsible && practice.responsible !== byResponsible) {
      return false;
    }
    if (byGroup && practice.group !== byGroup) {
      return false;
    }
    return true;
  });

  const filteredActivities = activities.filter((activity) => {
    if (byResponsible && activity.assignee !== byResponsible) {
      return false;
    }
    if (byGroup && activity.group !== byGroup) {
      return false;
    }
    return true;
  });

  const filteredDocuments = documents.filter((document) => {
    const practice = filteredPractices.find((entry) => entry.id === document.practiceId);
    if (!practice) {
      return false;
    }
    return true;
  });

  const filteredClients = clients.filter((client) => {
    const hasLinkedPractice = filteredPractices.some((practice) => practice.clientId === client.id);
    return hasLinkedPractice;
  });

  const filteredUsers = users.filter((candidate) => {
    if (byResponsible && candidate.displayName !== byResponsible) {
      return false;
    }
    if (byGroup && candidate.group !== byGroup) {
      return false;
    }
    return true;
  });

  return {
    practices: filteredPractices,
    activities: filteredActivities,
    documents: filteredDocuments,
    clients: filteredClients,
    users: filteredUsers,
  };
};

export const getDashboardKpis = (filters: DashboardFilters, user: DashboardUserLike | null): DashboardKpi[] => {
  const { practices, activities, documents, clients } = filterDashboardData(filters, user);
  const openPracticesCount = practices.filter((practice) => ['open', 'in_progress', 'waiting', 'under_review'].includes(practice.status)).length;
  const dueSoonPracticesCount = practices.filter((practice) => {
    const dueDate = normalizeDate(practice.dueDate);
    return getDateInRange(dueDate, filters.period);
  }).length;
  const openActivitiesCount = activities.filter((activity) => ['todo', 'in_progress', 'blocked'].includes(activity.status)).length;
  const overdueActivitiesCount = activities.filter((activity) => {
    const dueDate = normalizeDate(activity.dueDate);
    return dueDate < today && ['todo', 'in_progress', 'blocked'].includes(activity.status);
  }).length;
  const documentsDueSoonCount = documents.filter((document) => {
    const dueDate = normalizeDate(document.dueDate);
    return getDateInRange(dueDate, filters.period);
  }).length;
  const activeClientsCount = clients.filter((client) => client.status === 'active').length;

  return [
    { id: 'open-practices', title: 'Pratiche aperte', value: openPracticesCount, subtitle: 'In corso o da completare' },
    { id: 'due-practices', title: 'Pratiche in scadenza', value: dueSoonPracticesCount, subtitle: 'Entro il periodo selezionato' },
    { id: 'open-activities', title: 'Attività aperte', value: openActivitiesCount, subtitle: 'Da eseguire o in corso' },
    { id: 'overdue-activities', title: 'Attività scadute', value: overdueActivitiesCount, subtitle: 'Ancora aperte' },
    { id: 'documents-due', title: 'Documenti in scadenza', value: documentsDueSoonCount, subtitle: 'Entro il periodo selezionato' },
    { id: 'active-clients', title: 'Clienti attivi', value: activeClientsCount, subtitle: 'Anagrafiche attive' },
  ];
};

export const getDashboardDeadlines = (filters: DashboardFilters, user: DashboardUserLike | null): DashboardDeadlineItem[] => {
  const { practices, activities, documents } = filterDashboardData(filters, user);

  const items = [
    ...practices.map((practice) => ({
      id: `practice-${practice.id}`,
      kind: 'practice' as const,
      title: practice.subject,
      subtitle: `${practice.code} • ${practice.responsible}`,
      dueDate: practice.dueDate,
      status: practice.status,
      isOverdue: normalizeDate(practice.dueDate) < today,
      isToday: normalizeDate(practice.dueDate).toDateString() === today.toDateString(),
      isWithinThreeDays: normalizeDate(practice.dueDate).getTime() <= today.getTime() + 3 * 24 * 60 * 60 * 1000,
      isUrgent: practice.priority === 'urgent',
      priority: practice.priority,
    })),
    ...activities.map((activity) => ({
      id: `activity-${activity.id}`,
      kind: 'activity' as const,
      title: activity.title,
      subtitle: `${activity.code} • ${activity.assignee}`,
      dueDate: activity.dueDate,
      status: activity.status,
      isOverdue: normalizeDate(activity.dueDate) < today,
      isToday: normalizeDate(activity.dueDate).toDateString() === today.toDateString(),
      isWithinThreeDays: normalizeDate(activity.dueDate).getTime() <= today.getTime() + 3 * 24 * 60 * 60 * 1000,
      isUrgent: activity.priority === 'urgent',
      priority: activity.priority,
    })),
    ...documents.map((document) => ({
      id: `document-${document.id}`,
      kind: 'document' as const,
      title: document.name,
      subtitle: `${document.code} • ${document.owner}`,
      dueDate: document.dueDate,
      status: document.status,
      isOverdue: normalizeDate(document.dueDate) < today,
      isToday: normalizeDate(document.dueDate).toDateString() === today.toDateString(),
      isWithinThreeDays: normalizeDate(document.dueDate).getTime() <= today.getTime() + 3 * 24 * 60 * 60 * 1000,
      isUrgent: false,
    })),
  ];

  return items.sort((left, right) => normalizeDate(left.dueDate).getTime() - normalizeDate(right.dueDate).getTime());
};

export const getDashboardOpenActivities = (filters: DashboardFilters, user: DashboardUserLike | null): DashboardActivityItem[] => {
  const { activities, practices } = filterDashboardData(filters, user);

  return activities
    .filter((activity) => ['todo', 'in_progress', 'blocked'].includes(activity.status))
    .map((activity) => {
      const practice = practices.find((entry) => entry.id === activity.practiceId);
      return {
        id: activity.id,
        title: activity.title,
        practiceId: activity.practiceId,
        practiceCode: practice?.code ?? 'N/A',
        practiceSubject: practice?.subject ?? 'Pratica non assegnata',
        assignee: activity.assignee,
        priority: activity.priority,
        dueDate: activity.dueDate,
        status: activity.status,
      };
    })
    .sort((left, right) => normalizeDate(left.dueDate).getTime() - normalizeDate(right.dueDate).getTime());
};

export const getDashboardRecentPractices = (filters: DashboardFilters, user: DashboardUserLike | null): DashboardPracticeItem[] => {
  const { practices, clients } = filterDashboardData(filters, user);

  return practices
    .slice()
    .sort((left, right) => normalizeDate(right.updatedAt).getTime() - normalizeDate(left.updatedAt).getTime())
    .slice(0, 6)
    .map((practice) => {
      const client = clients.find((entry) => entry.id === practice.clientId);
      return {
        id: practice.id,
        code: practice.code,
        subject: practice.subject,
        clientName: client ? getClientDisplayName(client) : 'Cliente non assegnato',
        responsible: practice.responsible,
        status: practice.status,
        updatedAt: practice.updatedAt,
      };
    });
};

export const getDashboardTimelineEvents = (filters: DashboardFilters, user: DashboardUserLike | null): DashboardTimelineItem[] => {
  const { practices } = filterDashboardData(filters, user);

  const events = practices.flatMap((practice) => getEventsByPracticeId(practice.id).map((event) => ({
    ...event,
    practiceCode: practice.code,
  })));

  return events
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
    .slice(0, 8)
    .map((event) => ({
      id: event.id,
      practiceId: event.practiceId,
      practiceCode: event.practiceCode,
      title: event.title,
      userName: event.userName,
      createdAt: event.createdAt,
    }));
};

export const getDashboardWorkload = (filters: DashboardFilters, user: DashboardUserLike | null): DashboardWorkloadItem[] => {
  const { users, activities, practices } = filterDashboardData(filters, user);

  return users.map((candidate) => ({
    id: candidate.id,
    userName: candidate.displayName,
    group: candidate.group,
    openActivities: activities.filter((activity) => activity.assignee === candidate.displayName && ['todo', 'in_progress', 'blocked'].includes(activity.status)).length,
    urgentActivities: activities.filter((activity) => activity.assignee === candidate.displayName && activity.priority === 'urgent').length,
    assignedPractices: practices.filter((practice) => practice.responsible === candidate.displayName).length,
    role: candidate.role,
  }));
};

export const useDashboardData = (filters: DashboardFilters, user: DashboardUserLike | null) => {
  const kpis = useMemo(() => getDashboardKpis(filters, user), [filters, user]);
  const deadlines = useMemo(() => getDashboardDeadlines(filters, user), [filters, user]);
  const openActivities = useMemo(() => getDashboardOpenActivities(filters, user), [filters, user]);
  const recentPractices = useMemo(() => getDashboardRecentPractices(filters, user), [filters, user]);
  const timelineEvents = useMemo(() => getDashboardTimelineEvents(filters, user), [filters, user]);
  const workload = useMemo(() => getDashboardWorkload(filters, user), [filters, user]);

  return { kpis, deadlines, openActivities, recentPractices, timelineEvents, workload };
};
