import { getPracticeById } from '../../practices/services/practicesService';
import { addEvent, createTimelineEvent } from '../../timeline/services/timelineService';
import type { ActivityPriority, ActivityRecord, ActivityStatus } from '../activities.types';

const activitiesSeed: ActivityRecord[] = [
  {
    id: 'ATT-001',
    code: 'ATT-001',
    title: 'Verifica documentazione permesso',
    description: 'Controllo dei documenti tecnici richiesti per il rilascio del permesso.',
    practiceId: 'PRC-001',
    assignee: 'Laura Bianchi',
    group: 'Ufficio tecnico',
    status: 'todo',
    priority: 'high',
    startDate: '2026-07-20',
    dueDate: '2026-07-28',
    notes: 'Richiesta di integrazione del file cartografico.',
    updatedAt: '2026-07-20',
  },
  {
    id: 'ATT-002',
    code: 'ATT-002',
    title: 'Aggiornamento anagrafica cliente',
    description: 'Verifica dei dati correnti del cliente e aggiornamento archivio.',
    practiceId: 'PRC-002',
    assignee: 'Marco Rossi',
    group: 'Amministrazione',
    status: 'in_progress',
    priority: 'normal',
    startDate: '2026-07-21',
    dueDate: '2026-07-30',
    notes: 'Richiesta conferma PEC da parte del referente.',
    updatedAt: '2026-07-22',
  },
  {
    id: 'ATT-003',
    code: 'ATT-003',
    title: 'Controllo conformità impianto',
    description: 'Analisi dei documenti tecnici per la verifica di conformità.',
    practiceId: 'PRC-003',
    assignee: 'Sara Verdi',
    group: 'Controlli',
    status: 'blocked',
    priority: 'urgent',
    startDate: '2026-07-19',
    dueDate: '2026-07-27',
    notes: 'In attesa della firma del tecnico incaricato.',
    updatedAt: '2026-07-21',
  },
  {
    id: 'ATT-004',
    code: 'ATT-004',
    title: 'Integrazione documenti progettuali',
    description: 'Richiesta di documenti aggiuntivi per l’iter amministrativo.',
    practiceId: 'PRC-004',
    assignee: 'Luca Neri',
    group: 'Ufficio tecnico',
    status: 'todo',
    priority: 'high',
    startDate: '2026-07-22',
    dueDate: '2026-08-04',
    notes: 'Documento richiesto da direzione.',
    updatedAt: '2026-07-22',
  },
  {
    id: 'ATT-005',
    code: 'ATT-005',
    title: 'Preparazione del report finale',
    description: 'Compilazione del report con esito della pratica e allegati.',
    practiceId: 'PRC-005',
    assignee: 'Giulia Ferri',
    group: 'Direzione',
    status: 'in_progress',
    priority: 'normal',
    startDate: '2026-07-23',
    dueDate: '2026-08-08',
    notes: 'Da consegnare con la firma finale.',
    updatedAt: '2026-07-23',
  },
  {
    id: 'ATT-006',
    code: 'ATT-006',
    title: 'Consegna pratica commerciale',
    description: 'Finalizzazione del dossier commerciale e invio al referente.',
    practiceId: 'PRC-006',
    assignee: 'Paolo Galli',
    group: 'Amministrazione',
    status: 'completed',
    priority: 'low',
    startDate: '2026-07-17',
    dueDate: '2026-07-25',
    notes: 'Completata in anticipo.',
    updatedAt: '2026-07-24',
  },
  {
    id: 'ATT-007',
    code: 'ATT-007',
    title: 'Raccolta documenti mancanti',
    description: 'Aggiornamento del dossier con il set documentale incompleto.',
    practiceId: 'PRC-007',
    assignee: 'Elena Bassi',
    group: 'Segreteria',
    status: 'blocked',
    priority: 'normal',
    startDate: '2026-07-18',
    dueDate: '2026-07-29',
    notes: 'In attesa del documento fiscale.',
    updatedAt: '2026-07-19',
  },
  {
    id: 'ATT-008',
    code: 'ATT-008',
    title: 'Analisi annullamento richiesta',
    description: 'Controllo dei motivi di annullamento e aggiornamento registro.',
    practiceId: 'PRC-008',
    assignee: 'Matteo Sala',
    group: 'Segreteria',
    status: 'cancelled',
    priority: 'low',
    startDate: '2026-07-15',
    dueDate: '2026-07-16',
    notes: 'Operazione non proseguita.',
    updatedAt: '2026-07-16',
  },
  {
    id: 'ATT-009',
    code: 'ATT-009',
    title: 'Aggiornamento piano lavori',
    description: 'Rielaborazione del piano dei lavori per la pratica tecnica.',
    practiceId: 'PRC-001',
    assignee: 'Sara Verdi',
    group: 'Ufficio tecnico',
    status: 'todo',
    priority: 'urgent',
    startDate: '2026-07-24',
    dueDate: '2026-07-31',
    notes: 'Necessaria verifica con il cliente.',
    updatedAt: '2026-07-24',
  },
  {
    id: 'ATT-010',
    code: 'ATT-010',
    title: 'Chiusura iter amministrativo',
    description: 'Conferma della chiusura degli step amministrativi della pratica.',
    practiceId: 'PRC-005',
    assignee: 'Giulia Ferri',
    group: 'Direzione',
    status: 'in_progress',
    priority: 'high',
    startDate: '2026-07-24',
    dueDate: '2026-08-09',
    notes: 'Da verificare con il referenza interno.',
    updatedAt: '2026-07-24',
  },
];

let activitiesStore: ActivityRecord[] = [...activitiesSeed];

export const getActivities = (): ActivityRecord[] => activitiesStore.map((activity) => ({ ...activity }));

export const addActivity = (activity: ActivityRecord): ActivityRecord[] => {
  activitiesStore = [activity, ...activitiesStore];

  addEvent(
    createTimelineEvent(
      activity.practiceId,
      'activity_created',
      'Attività creata',
      `L’attività ${activity.title} è stata aggiunta alla pratica.`,
      activity.assignee || 'Sistema',
      new Date().toISOString(),
    ),
  );

  return getActivities();
};

export const getActivityById = (id: string): ActivityRecord | undefined => activitiesStore.find((activity) => activity.id === id);

export const getActivitiesByPracticeId = (practiceId: string): ActivityRecord[] =>
  getActivities()
    .filter((activity) => activity.practiceId === practiceId)
    .sort((left, right) => left.dueDate.localeCompare(right.dueDate));

export const updateActivityStatus = (id: string, status: ActivityStatus): ActivityRecord | undefined => {
  const activity = activitiesStore.find((item) => item.id === id);

  if (!activity) {
    return undefined;
  }

  activity.status = status;
  activity.updatedAt = new Date().toISOString().slice(0, 10);

  if (status === 'completed') {
    addEvent(
      createTimelineEvent(
        activity.practiceId,
        'activity_completed',
        'Attività completata',
        `L’attività ${activity.title} è stata completata.`,
        activity.assignee || 'Sistema',
        new Date().toISOString(),
      ),
    );
  }

  if (status === 'cancelled') {
    addEvent(
      createTimelineEvent(
        activity.practiceId,
        'activity_cancelled',
        'Attività annullata',
        `L’attività ${activity.title} è stata annullata.`,
        activity.assignee || 'Sistema',
        new Date().toISOString(),
      ),
    );
  }

  return { ...activity };
};

export const getActivityPracticeDisplayName = (activity: ActivityRecord): string => {
  const practice = getPracticeById(activity.practiceId);
  return practice ? `${practice.code} • ${practice.subject}` : 'Pratica non assegnata';
};

export const filterActivities = (
  activities: ActivityRecord[],
  search: string,
  status: ActivityStatus | 'all',
  priority: ActivityPriority | 'all',
  assignee: string | 'all',
  practiceId: string | 'all',
): ActivityRecord[] => {
  const normalized = search.trim().toLowerCase();

  return activities.filter((activity) => {
    const practiceLabel = getActivityPracticeDisplayName(activity).toLowerCase();
    const matchesSearch =
      normalized.length === 0 ||
      activity.code.toLowerCase().includes(normalized) ||
      activity.title.toLowerCase().includes(normalized) ||
      activity.assignee.toLowerCase().includes(normalized) ||
      activity.group.toLowerCase().includes(normalized) ||
      practiceLabel.includes(normalized);

    const matchesStatus = status === 'all' || activity.status === status;
    const matchesPriority = priority === 'all' || activity.priority === priority;
    const matchesAssignee = assignee === 'all' || activity.assignee === assignee;
    const matchesPractice = practiceId === 'all' || activity.practiceId === practiceId;

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee && matchesPractice;
  });
};
