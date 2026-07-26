export type StatusCatalogKind = 'practice' | 'activity' | 'document' | 'user' | 'calendar';

export interface StatusCatalogOption {
  value: string;
  label: string;
}

const statusCatalogs: Record<StatusCatalogKind, StatusCatalogOption[]> = {
  practice: [
    { value: 'draft', label: 'Bozza' },
    { value: 'open', label: 'Aperta' },
    { value: 'in_progress', label: 'In lavorazione' },
    { value: 'waiting', label: 'In attesa' },
    { value: 'under_review', label: 'Da controllare' },
    { value: 'approved', label: 'Approvata' },
    { value: 'completed', label: 'Completata' },
    { value: 'archived', label: 'Archiviata' },
    { value: 'cancelled', label: 'Annullata' },
  ],
  activity: [
    { value: 'todo', label: 'Da fare' },
    { value: 'in_progress', label: 'In corso' },
    { value: 'blocked', label: 'Bloccata' },
    { value: 'completed', label: 'Completata' },
    { value: 'cancelled', label: 'Annullata' },
  ],
  document: [
    { value: 'draft', label: 'Bozza' },
    { value: 'active', label: 'Attivo' },
    { value: 'signed', label: 'Firmato' },
    { value: 'expired', label: 'Scaduto' },
    { value: 'archived', label: 'Archiviato' },
  ],
  user: [
    { value: 'Active', label: 'Attivo' },
    { value: 'Suspended', label: 'Sospeso' },
    { value: 'Disabled', label: 'Disabilitato' },
  ],
  calendar: [
    { value: 'todo', label: 'Da fare' },
    { value: 'open', label: 'Aperta' },
    { value: 'in_progress', label: 'In corso' },
    { value: 'waiting', label: 'In attesa' },
    { value: 'under_review', label: 'Da controllare' },
    { value: 'approved', label: 'Approvata' },
    { value: 'completed', label: 'Completata' },
    { value: 'active', label: 'Attivo' },
    { value: 'inactive', label: 'Inattivo' },
    { value: 'archived', label: 'Archiviato' },
    { value: 'cancelled', label: 'Annullata' },
    { value: 'blocked', label: 'Bloccata' },
    { value: 'signed', label: 'Firmato' },
    { value: 'expired', label: 'Scaduto' },
    { value: 'draft', label: 'Bozza' },
  ],
};

export const getStatusCatalog = (kind: StatusCatalogKind): StatusCatalogOption[] => statusCatalogs[kind].map((option) => ({ ...option }));

export const getStatusLabel = (kind: StatusCatalogKind, value: string): string => statusCatalogs[kind].find((option) => option.value === value)?.label ?? value;
