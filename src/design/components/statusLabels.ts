const statusLabels: Record<string, string> = {
  draft: 'Bozza',
  open: 'Aperta',
  in_progress: 'In lavorazione',
  waiting: 'In attesa',
  under_review: 'Da controllare',
  approved: 'Approvata',
  completed: 'Completata',
  active: 'Attivo',
  inactive: 'Inattivo',
  archived: 'Archiviato',
  cancelled: 'Annullata',
  suspended: 'Sospeso',
  disabled: 'Disabilitato',
  todo: 'Da fare',
  blocked: 'Bloccata',
  signed: 'Firmato',
  expired: 'Scaduto',
  practice: 'Pratica',
  activity: 'Attività',
  document: 'Documento',
  deadline: 'Scadenza',
  received: 'Ricevuto',
  produced: 'Prodotto',
  communication: 'Comunicazione',
  attachment: 'Allegato',
  other: 'Altro',
};

export const getStatusLabel = (status: string): string => statusLabels[status] ?? status;

export const getStatusTone = (
  status: string,
): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' => {
  switch (status) {
    case 'open':
    case 'practice':
    case 'received':
      return 'primary';
    case 'in_progress':
    case 'activity':
    case 'produced':
      return 'secondary';
    case 'approved':
    case 'completed':
    case 'active':
    case 'signed':
      return 'success';
    case 'waiting':
    case 'under_review':
    case 'inactive':
    case 'suspended':
    case 'deadline':
      return 'warning';
    case 'cancelled':
    case 'blocked':
    case 'expired':
      return 'error';
    default:
      return 'default';
  }
};
