import { getClientById, getClientDisplayName } from '../../clients/services/clientsService';
import { addEvent, createTimelineEvent } from '../../timeline/services/timelineService';
import type { PracticeRecord, PracticeStatus, PracticePriority } from '../practices.types';

const practicesSeed: PracticeRecord[] = [
  {
    id: 'PRC-001',
    code: 'PRC-001',
    subject: 'Autorizzazione permesso edilizio',
    status: 'open',
    priority: 'high',
    clientId: 'CLI-001',
    responsible: 'Laura Bianchi',
    group: 'Ufficio tecnico',
    dueDate: '2026-07-30',
    updatedAt: '2026-07-24',
  },
  {
    id: 'PRC-002',
    code: 'PRC-002',
    subject: 'Aggiornamento documentazione cliente',
    status: 'in_progress',
    priority: 'normal',
    clientId: 'CLI-002',
    responsible: 'Marco Rossi',
    group: 'Amministrazione',
    dueDate: '2026-08-02',
    updatedAt: '2026-07-23',
  },
  {
    id: 'PRC-003',
    code: 'PRC-003',
    subject: 'Verifica conformità impianto',
    status: 'waiting',
    priority: 'urgent',
    clientId: 'CLI-003',
    responsible: 'Sara Verdi',
    group: 'Controlli',
    dueDate: '2026-07-28',
    updatedAt: '2026-07-22',
  },
  {
    id: 'PRC-004',
    code: 'PRC-004',
    subject: 'Richiesta integrazione documenti',
    status: 'under_review',
    priority: 'high',
    clientId: 'CLI-004',
    responsible: 'Luca Neri',
    group: 'Ufficio tecnico',
    dueDate: '2026-08-05',
    updatedAt: '2026-07-21',
  },
  {
    id: 'PRC-005',
    code: 'PRC-005',
    subject: 'Approvazione finale progetto',
    status: 'approved',
    priority: 'normal',
    clientId: 'CLI-005',
    responsible: 'Giulia Ferri',
    group: 'Direzione',
    dueDate: '2026-08-10',
    updatedAt: '2026-07-20',
  },
  {
    id: 'PRC-006',
    code: 'PRC-006',
    subject: 'Chiusura pratica commerciale',
    status: 'completed',
    priority: 'low',
    clientId: 'CLI-006',
    responsible: 'Paolo Galli',
    group: 'Amministrazione',
    dueDate: '2026-07-25',
    updatedAt: '2026-07-19',
  },
  {
    id: 'PRC-007',
    code: 'PRC-007',
    subject: 'Pratica sospesa per documenti mancanti',
    status: 'archived',
    priority: 'normal',
    clientId: 'CLI-007',
    responsible: 'Elena Bassi',
    group: 'Segreteria',
    dueDate: '2026-07-18',
    updatedAt: '2026-07-18',
  },
  {
    id: 'PRC-008',
    code: 'PRC-008',
    subject: 'Annullamento richiesta iniziale',
    status: 'cancelled',
    priority: 'low',
    clientId: 'CLI-008',
    responsible: 'Matteo Sala',
    group: 'Segreteria',
    dueDate: '2026-07-16',
    updatedAt: '2026-07-17',
  },
];

let practicesStore: PracticeRecord[] = [...practicesSeed];

export const getPractices = (): PracticeRecord[] => practicesStore.map((practice) => ({ ...practice }));

export const addPractice = (practice: PracticeRecord): PracticeRecord[] => {
  practicesStore = [practice, ...practicesStore];

  addEvent(
    createTimelineEvent(
      practice.id,
      'practice_created',
      'Pratica creata',
      `La pratica ${practice.subject} è stata avviata e inserita nel workflow operativo.`,
      practice.responsible || 'Sistema',
      new Date().toISOString(),
    ),
  );

  return getPractices();
};

export const getPracticeById = (id: string): PracticeRecord | undefined => practicesStore.find((practice) => practice.id === id);

export const getPracticeClient = (practice: PracticeRecord) => getClientById(practice.clientId);

export const getPracticeClientDisplayName = (practice: PracticeRecord): string => getClientDisplayName(getPracticeClient(practice));

export const filterPractices = (
  practices: PracticeRecord[],
  search: string,
  status: PracticeStatus | 'all',
  priority: PracticePriority | 'all',
  clientId: string | 'all' = 'all',
): PracticeRecord[] => {
  const normalized = search.trim().toLowerCase();

  return practices.filter((practice) => {
    const clientName = getPracticeClientDisplayName(practice).toLowerCase();
    const matchesSearch =
      normalized.length === 0 ||
      practice.code.toLowerCase().includes(normalized) ||
      practice.subject.toLowerCase().includes(normalized) ||
      practice.responsible.toLowerCase().includes(normalized) ||
      practice.group.toLowerCase().includes(normalized) ||
      clientName.includes(normalized);

    const matchesStatus = status === 'all' || practice.status === status;
    const matchesPriority = priority === 'all' || practice.priority === priority;
    const matchesClient = clientId === 'all' || practice.clientId === clientId;

    return matchesSearch && matchesStatus && matchesPriority && matchesClient;
  });
};
