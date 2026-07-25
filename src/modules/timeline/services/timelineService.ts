import type { TimelineEvent, TimelineEventType } from '../timeline.types';

const timelineStore: TimelineEvent[] = [
  {
    id: 'EVT-001',
    practiceId: 'PRC-001',
    type: 'practice_created',
    title: 'Pratica creata',
    description: 'La pratica è stata avviata e assegnata al team tecnico.',
    userName: 'Sistema',
    createdAt: '2026-07-20T09:30:00',
  },
  {
    id: 'EVT-002',
    practiceId: 'PRC-002',
    type: 'practice_updated',
    title: 'Aggiornamento pratico',
    description: 'Sono stati inseriti i dettagli amministrativi del cliente.',
    userName: 'Marco Rossi',
    createdAt: '2026-07-21T11:15:00',
  },
  {
    id: 'EVT-003',
    practiceId: 'PRC-003',
    type: 'activity_created',
    title: 'Attività inserita',
    description: 'È stata aggiunta una nuova attività di controllo conformità.',
    userName: 'Sara Verdi',
    createdAt: '2026-07-19T13:10:00',
  },
  {
    id: 'EVT-004',
    practiceId: 'PRC-004',
    type: 'activity_completed',
    title: 'Attività completata',
    description: 'L’attività di integrazione documentale è stata chiusa.',
    userName: 'Luca Neri',
    createdAt: '2026-07-23T15:40:00',
  },
  {
    id: 'EVT-005',
    practiceId: 'PRC-005',
    type: 'practice_status_changed',
    title: 'Stato aggiornato',
    description: 'La pratica è stata spostata in fase di approvazione.',
    userName: 'Giulia Ferri',
    createdAt: '2026-07-24T08:00:00',
  },
  {
    id: 'EVT-006',
    practiceId: 'PRC-006',
    type: 'note_added',
    title: 'Nota aggiunta',
    description: 'È stata aggiunta una nota di chiusura della pratica.',
    userName: 'Paolo Galli',
    createdAt: '2026-07-24T10:20:00',
  },
  {
    id: 'EVT-007',
    practiceId: 'PRC-007',
    type: 'activity_cancelled',
    title: 'Attività annullata',
    description: 'L’attività è stata annullata per documenti mancanti.',
    userName: 'Elena Bassi',
    createdAt: '2026-07-20T16:45:00',
  },
  {
    id: 'EVT-008',
    practiceId: 'PRC-008',
    type: 'practice_client_changed',
    title: 'Cliente aggiornato',
    description: 'È stato aggiornato il cliente associato alla pratica.',
    userName: 'Matteo Sala',
    createdAt: '2026-07-17T09:10:00',
  },
  {
    id: 'EVT-009',
    practiceId: 'PRC-001',
    type: 'activity_created',
    title: 'Nuova attività pianificata',
    description: 'È stata aggiunta un’attività per il piano dei lavori.',
    userName: 'Sara Verdi',
    createdAt: '2026-07-24T12:05:00',
  },
  {
    id: 'EVT-010',
    practiceId: 'PRC-005',
    type: 'document_added',
    title: 'Documento allegato',
    description: 'È stato caricato il report finale della pratica.',
    userName: 'Giulia Ferri',
    createdAt: '2026-07-25T14:35:00',
  },
];

export const getEventsByPracticeId = (practiceId: string): TimelineEvent[] =>
  timelineStore.filter((event) => event.practiceId === practiceId).sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());

export const addEvent = (event: TimelineEvent): TimelineEvent[] => {
  timelineStore.push(event);
  return getEventsByPracticeId(event.practiceId);
};

export const clearEvents = (): void => {
  timelineStore.length = 0;
};

export const getLatestEventByPracticeId = (practiceId: string): TimelineEvent | undefined => getEventsByPracticeId(practiceId)[0];

export const createTimelineEvent = (practiceId: string, type: TimelineEventType, title: string, description: string, userName: string, createdAt?: string): TimelineEvent => ({
  id: `EVT-${String(timelineStore.length + 1).padStart(3, '0')}`,
  practiceId,
  type,
  title,
  description,
  userName,
  createdAt: createdAt ?? new Date().toISOString(),
});
