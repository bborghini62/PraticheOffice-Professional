import { addEvent, createTimelineEvent } from '../../timeline/services/timelineService';
import { getPracticeById } from '../../practices/services/practicesService';
import { getAttachmentsByDocumentId, removeAttachment } from './documentAttachmentsService';
import { loadPersistedArray, savePersistedArray } from '../../../core/persistence/localStorageStore';
import type { DocumentCategory, DocumentRecord, DocumentStatus } from '../documents.types';

const documentsSeed: DocumentRecord[] = [
  {
    id: 'DOC-001',
    code: 'DOC-001',
    name: 'Relazione tecnica preliminare',
    description: 'Documento di supporto al rilascio della pratica amministrativa.',
    practiceId: 'PRC-001',
    category: 'produced',
    status: 'active',
    owner: 'Laura Bianchi',
    version: 2,
    provider: 'local',
    logicalPath: 'Pratiche/PRC-001/Relazione tecnica preliminare.pdf',
    documentDate: '2026-07-18',
    dueDate: '2026-08-02',
    lastUpdatedAt: '2026-07-24',
    notes: 'Documento condiviso con il team tecnico.',
  },
  {
    id: 'DOC-002',
    code: 'DOC-002',
    name: 'Certificato di conformità',
    description: 'Documento ricevuto dal referente tecnico.',
    practiceId: 'PRC-002',
    category: 'received',
    status: 'signed',
    owner: 'Marco Rossi',
    version: 1,
    provider: 'google_drive',
    logicalPath: 'Pratiche/PRC-002/Certificato di conformità.pdf',
    documentDate: '2026-07-20',
    dueDate: '2026-08-05',
    lastUpdatedAt: '2026-07-23',
    notes: 'Firmato digitalmente il 21/07/2026.',
  },
  {
    id: 'DOC-003',
    code: 'DOC-003',
    name: 'Comunicazione di richiesta integrazione',
    description: 'Messaggio operativo inviato al cliente.',
    practiceId: 'PRC-003',
    category: 'communication',
    status: 'active',
    owner: 'Sara Verdi',
    version: 3,
    provider: 'dropbox',
    logicalPath: 'Pratiche/PRC-003/Comunicazione richiesta integrazione.docx',
    documentDate: '2026-07-15',
    dueDate: '2026-07-29',
    lastUpdatedAt: '2026-07-21',
    notes: 'Da seguire con il referente interno.',
  },
  {
    id: 'DOC-004',
    code: 'DOC-004',
    name: 'Modulo di firma finale',
    description: 'Modulo firmato per la pratica di approvazione finale.',
    practiceId: 'PRC-004',
    category: 'signed',
    status: 'signed',
    owner: 'Luca Neri',
    version: 1,
    provider: 'local',
    logicalPath: 'Pratiche/PRC-004/Modulo di firma finale.pdf',
    documentDate: '2026-07-17',
    dueDate: '2026-08-01',
    lastUpdatedAt: '2026-07-22',
    notes: 'Documento chiuso in sede di revisione.',
  },
  {
    id: 'DOC-005',
    code: 'DOC-005',
    name: 'Allegato planimetrico',
    description: 'Planimetria allegata al dossier tecnico.',
    practiceId: 'PRC-005',
    category: 'attachment',
    status: 'active',
    owner: 'Giulia Ferri',
    version: 2,
    provider: 'google_drive',
    logicalPath: 'Pratiche/PRC-005/Allegato planimetrico.pdf',
    documentDate: '2026-07-19',
    dueDate: '2026-08-06',
    lastUpdatedAt: '2026-07-24',
    notes: 'Aggiornato con ultima versione tecnica.',
  },
  {
    id: 'DOC-006',
    code: 'DOC-006',
    name: 'Report di chiusura pratica',
    description: 'Documento amministrativo finale della pratica.',
    practiceId: 'PRC-006',
    category: 'produced',
    status: 'archived',
    owner: 'Paolo Galli',
    version: 4,
    provider: 'dropbox',
    logicalPath: 'Pratiche/PRC-006/Report di chiusura pratica.pdf',
    documentDate: '2026-07-16',
    dueDate: '2026-07-24',
    lastUpdatedAt: '2026-07-24',
    notes: 'Archiviato dopo la consegna finale.',
  },
  {
    id: 'DOC-007',
    code: 'DOC-007',
    name: 'Richiesta documenti integrativi',
    description: 'Richiesta di integrazione documentale.',
    practiceId: 'PRC-007',
    category: 'received',
    status: 'draft',
    owner: 'Elena Bassi',
    version: 1,
    provider: 'local',
    logicalPath: 'Pratiche/PRC-007/Richiesta documenti integrativi.pdf',
    documentDate: '2026-07-13',
    dueDate: '2026-07-27',
    lastUpdatedAt: '2026-07-18',
    notes: 'In attesa di risposta del cliente.',
  },
  {
    id: 'DOC-008',
    code: 'DOC-008',
    name: 'Annullamento richiesta iniziale',
    description: 'Documento di annullamento della richiesta.',
    practiceId: 'PRC-008',
    category: 'other',
    status: 'expired',
    owner: 'Matteo Sala',
    version: 1,
    provider: 'google_drive',
    logicalPath: 'Pratiche/PRC-008/Annullamento richiesta iniziale.pdf',
    documentDate: '2026-07-10',
    dueDate: '2026-07-16',
    lastUpdatedAt: '2026-07-16',
    notes: 'Pratica chiusa per annullamento.',
  },
  {
    id: 'DOC-009',
    code: 'DOC-009',
    name: 'Piano lavori aggiornato',
    description: 'Documento tecnico aggiornato con nuovi requisiti.',
    practiceId: 'PRC-001',
    category: 'produced',
    status: 'active',
    owner: 'Sara Verdi',
    version: 2,
    provider: 'dropbox',
    logicalPath: 'Pratiche/PRC-001/Piano lavori aggiornato.pdf',
    documentDate: '2026-07-22',
    dueDate: '2026-08-03',
    lastUpdatedAt: '2026-07-24',
    notes: 'Richiede verifica con il cliente.',
  },
  {
    id: 'DOC-010',
    code: 'DOC-010',
    name: 'Lettera di accompagnamento',
    description: 'Lettera inviata alla direzione in allegato.',
    practiceId: 'PRC-005',
    category: 'communication',
    status: 'active',
    owner: 'Giulia Ferri',
    version: 1,
    provider: 'local',
    logicalPath: 'Pratiche/PRC-005/Lettera di accompagnamento.docx',
    documentDate: '2026-07-21',
    dueDate: '2026-08-04',
    lastUpdatedAt: '2026-07-24',
    notes: 'Seguita dalla direzione.',
  },
];

const DOCUMENTS_STORAGE_KEY = 'praticheoffice.documents.v1';
let documentsStore: DocumentRecord[] = loadPersistedArray(DOCUMENTS_STORAGE_KEY, documentsSeed);

export const getDocuments = (): DocumentRecord[] => documentsStore.map((document) => ({ ...document }));

export const addDocument = (document: DocumentRecord): DocumentRecord[] => {
  documentsStore = [document, ...documentsStore];
  savePersistedArray(DOCUMENTS_STORAGE_KEY, documentsStore);

  addEvent(
    createTimelineEvent(
      document.practiceId,
      'document_added',
      'Documento registrato',
      `Il documento ${document.name} è stato aggiunto alla pratica.`,
      document.owner,
      new Date().toISOString(),
    ),
  );

  return getDocuments();
};

export const getDocumentById = (id: string): DocumentRecord | undefined => documentsStore.find((document) => document.id === id);

export const deleteDocument = (documentId: string, userName: string): DocumentRecord | undefined => {
  const document = documentsStore.find((candidate) => candidate.id === documentId);
  if (!document) {
    return undefined;
  }

  getAttachmentsByDocumentId(documentId).forEach((attachment) => removeAttachment(attachment.id, { documentName: document.name, userName, practiceId: document.practiceId }));
  documentsStore = documentsStore.filter((candidate) => candidate.id !== documentId);
  savePersistedArray(DOCUMENTS_STORAGE_KEY, documentsStore);

  addEvent(
    createTimelineEvent(
      document.practiceId,
      'document_deleted',
      'Documento eliminato',
      `Il documento ${document.name} è stato eliminato.`,
      userName,
      new Date().toISOString(),
    ),
  );

  return { ...document };
};

export const getDocumentsByPracticeId = (practiceId: string): DocumentRecord[] =>
  getDocuments()
    .filter((document) => document.practiceId === practiceId)
    .sort((left, right) => right.documentDate.localeCompare(left.documentDate));

export const getDocumentPracticeDisplayName = (document: DocumentRecord): string => {
  const practice = getPracticeById(document.practiceId);
  return practice ? `${practice.code} • ${practice.subject}` : 'Pratica non assegnata';
};

export const filterDocuments = (
  documents: DocumentRecord[],
  search: string,
  status: DocumentStatus | 'all',
  category: DocumentCategory | 'all',
  practiceId: string | 'all',
  owner: string | 'all',
): DocumentRecord[] => {
  const normalized = search.trim().toLowerCase();

  return documents.filter((document) => {
    const practiceLabel = getDocumentPracticeDisplayName(document).toLowerCase();
    const matchesSearch =
      normalized.length === 0 ||
      document.code.toLowerCase().includes(normalized) ||
      document.name.toLowerCase().includes(normalized) ||
      document.owner.toLowerCase().includes(normalized) ||
      document.category.toLowerCase().includes(normalized) ||
      practiceLabel.includes(normalized);

    const matchesStatus = status === 'all' || document.status === status;
    const matchesCategory = category === 'all' || document.category === category;
    const matchesPractice = practiceId === 'all' || document.practiceId === practiceId;
    const matchesOwner = owner === 'all' || document.owner === owner;

    return matchesSearch && matchesStatus && matchesCategory && matchesPractice && matchesOwner;
  });
};
