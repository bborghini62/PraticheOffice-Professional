export type DocumentStatus = 'draft' | 'active' | 'signed' | 'expired' | 'archived';

export type DocumentCategory = 'received' | 'produced' | 'communication' | 'signed' | 'attachment' | 'other';

export type DocumentProvider = 'local' | 'google_drive' | 'dropbox';

export interface DocumentRecord {
  id: string;
  code: string;
  name: string;
  description: string;
  practiceId: string;
  category: DocumentCategory;
  status: DocumentStatus;
  owner: string;
  version: number;
  provider: DocumentProvider;
  logicalPath: string;
  documentDate: string;
  dueDate: string;
  lastUpdatedAt: string;
  notes: string;
}

export interface DocumentsFilters {
  search: string;
  status: DocumentStatus | 'all';
  category: DocumentCategory | 'all';
  practiceId: string | 'all';
  owner: string | 'all';
}
