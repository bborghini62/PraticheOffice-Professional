const PO_VERSION = '0.1.0-cloud-foundation';
const PO_SERVICE_NAME = 'PraticheOffice Google Cloud';

const PO_PROPERTIES = Object.freeze({
  SPREADSHEET_ID: 'PO_SPREADSHEET_ID',
  ROOT_FOLDER_ID: 'PO_ROOT_FOLDER_ID',
  PRACTICES_FOLDER_ID: 'PO_PRACTICES_FOLDER_ID',
  BACKUP_FOLDER_ID: 'PO_BACKUP_FOLDER_ID',
  TEMPLATES_FOLDER_ID: 'PO_TEMPLATES_FOLDER_ID',
  GOOGLE_CLIENT_ID: 'PO_GOOGLE_CLIENT_ID',
  ALLOWED_DOMAIN: 'PO_ALLOWED_DOMAIN',
});

const PO_SHEETS = Object.freeze({
  USERS: 'Utenti',
  CLIENTS: 'Clienti',
  PRACTICES: 'Pratiche',
  ACTIVITIES: 'Attivita',
  DOCUMENTS: 'Documenti',
  GROUPS: 'Gruppi',
  CATEGORIES: 'Categorie',
  TIMELINE: 'Timeline',
  AUDIT: 'AuditLog',
});

const PO_HEADERS = Object.freeze({
  Utenti: ['id', 'email', 'nome', 'ruolo', 'attivo', 'gruppi', 'createdAt', 'updatedAt'],
  Clienti: [
    'id', 'code', 'clientType', 'companyName', 'firstName', 'lastName', 'vatNumber', 'fiscalCode', 'contactPerson',
    'email', 'pec', 'phone', 'mobile', 'address', 'postalCode', 'city', 'province', 'country', 'notes', 'status',
    'createdBy', 'createdAt', 'updatedBy', 'updatedAt', 'version'
  ],
  Pratiche: [
    'id', 'code', 'subject', 'description', 'status', 'priority', 'clientId', 'responsible', 'responsibleEmail', 'group',
    'dueDate', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'
  ],
  Attivita: [
    'id', 'practiceId', 'title', 'description', 'status', 'priority', 'assignedTo', 'assignedEmail', 'group', 'dueDate',
    'createdBy', 'createdAt', 'updatedBy', 'updatedAt'
  ],
  Documenti: [
    'id', 'documentId', 'practiceId', 'title', 'category', 'status', 'version', 'storageProvider', 'driveFileId', 'driveUrl', 'fileName',
    'mimeType', 'size', 'uploadedBy', 'createdAt', 'updatedAt'
  ],
  Gruppi: ['id', 'nome', 'descrizione', 'responsabileEmail', 'membri', 'attivo', 'createdAt', 'updatedAt'],
  Categorie: ['id', 'ambito', 'nome', 'descrizione', 'colore', 'attivo', 'createdAt', 'updatedAt'],
  Timeline: ['id', 'practiceId', 'eventType', 'title', 'description', 'actorEmail', 'createdAt'],
  AuditLog: ['id', 'requestId', 'actorEmail', 'action', 'entityType', 'entityId', 'result', 'details', 'createdAt'],
});

const PO_ROLES = Object.freeze({
  ADMIN: 'Amministratore',
  RESPONSIBLE: 'Responsabile',
  OPERATOR: 'Operatore',
  READ_ONLY: 'Consultazione',
});
