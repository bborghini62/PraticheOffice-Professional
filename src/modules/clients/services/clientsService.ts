import { loadCloudConfig } from '../../../core/cloud/cloudConfig';
import { getGoogleCloudSession } from '../../../core/cloud/cloudSession';
import { callGoogleCloud, isCloudAuthError } from '../../../core/cloud/googleAppsScriptClient';
import { loadPersistedArray, savePersistedArray } from '../../../core/persistence/localStorageStore';
import type { ClientRecord, ClientStatus, ClientType } from '../clients.types';

type ClientsSyncStatus = 'idle' | 'syncing' | 'synced' | 'offline' | 'error';

interface ClientsSyncState {
  status: ClientsSyncStatus;
  message: string;
  lastSyncAt: string | null;
}

type SeedClient = Omit<ClientRecord, 'createdAt' | 'createdBy' | 'updatedBy' | 'version'> & {
  updatedAt: string;
};

const clientsSeedBase: SeedClient[] = [
  {
    id: 'CLI-001',
    code: 'CLI-001',
    clientType: 'company',
    companyName: 'Alpha Costruzioni S.r.l.',
    firstName: '',
    lastName: '',
    vatNumber: 'IT12345670017',
    fiscalCode: '12345670017',
    contactPerson: 'Marco Bellini',
    email: 'marco.bellini@alphacostruzioni.it',
    pec: 'marco.bellini@pec.alphacostruzioni.it',
    phone: '055 1234567',
    mobile: '333 1234567',
    address: 'Via dei Lavori 12',
    postalCode: '50129',
    city: 'Firenze',
    province: 'FI',
    country: 'Italia',
    notes: 'Cliente storico con pratiche tecniche attive.',
    status: 'active',
    updatedAt: '2026-07-20T08:30:00.000Z',
  },
  {
    id: 'CLI-002',
    code: 'CLI-002',
    clientType: 'private',
    companyName: '',
    firstName: 'Giulia',
    lastName: 'Rossi',
    vatNumber: '',
    fiscalCode: 'RSSGLA80A41D612V',
    contactPerson: 'Giulia Rossi',
    email: 'giulia.rossi@email.it',
    pec: '',
    phone: '055 7654321',
    mobile: '347 7654321',
    address: 'Piazza della Repubblica 4',
    postalCode: '50123',
    city: 'Firenze',
    province: 'FI',
    country: 'Italia',
    notes: 'Privato con richiesta di assistenza amministrativa.',
    status: 'active',
    updatedAt: '2026-07-18T09:15:00.000Z',
  },
  {
    id: 'CLI-003',
    code: 'CLI-003',
    clientType: 'public_entity',
    companyName: 'Comune di Prato',
    firstName: '',
    lastName: '',
    vatNumber: 'IT00443410486',
    fiscalCode: '00443410486',
    contactPerson: 'Elena Gori',
    email: 'e.gori@comune.prato.it',
    pec: 'e.gori@pec.comune.prato.it',
    phone: '0574 123456',
    mobile: '347 5551234',
    address: 'Piazza del Comune 1',
    postalCode: '59100',
    city: 'Prato',
    province: 'PO',
    country: 'Italia',
    notes: 'Ente pubblico con iter di autorizzazione.',
    status: 'active',
    updatedAt: '2026-07-15T11:00:00.000Z',
  },
  {
    id: 'CLI-004',
    code: 'CLI-004',
    clientType: 'professional',
    companyName: 'Studio Legale Bianchi & Associati',
    firstName: '',
    lastName: '',
    vatNumber: 'IT12345670018',
    fiscalCode: '12345670018',
    contactPerson: 'Luca Bianchi',
    email: 'luca.bianchi@studiolegalebianchi.it',
    pec: 'luca.bianchi@pec.studiolegalebianchi.it',
    phone: '055 1112233',
    mobile: '347 7778899',
    address: 'Via Roma 22',
    postalCode: '50125',
    city: 'Firenze',
    province: 'FI',
    country: 'Italia',
    notes: 'Professionista con attività di consulenza.',
    status: 'inactive',
    updatedAt: '2026-07-12T14:20:00.000Z',
  },
  {
    id: 'CLI-005',
    code: 'CLI-005',
    clientType: 'association',
    companyName: 'Associazione Cultura e Territorio',
    firstName: '',
    lastName: '',
    vatNumber: 'IT12345670019',
    fiscalCode: '12345670019',
    contactPerson: 'Sara Verdi',
    email: 'sara.verdi@culturaeterritorio.it',
    pec: 'sara.verdi@pec.culturaeterritorio.it',
    phone: '055 4445566',
    mobile: '339 4445566',
    address: 'Corso Italia 88',
    postalCode: '50100',
    city: 'Firenze',
    province: 'FI',
    country: 'Italia',
    notes: 'Associazione con attività di supporto comunitario.',
    status: 'active',
    updatedAt: '2026-07-10T10:45:00.000Z',
  },
  {
    id: 'CLI-006',
    code: 'CLI-006',
    clientType: 'company',
    companyName: 'Nordica Impianti S.p.A.',
    firstName: '',
    lastName: '',
    vatNumber: 'IT12345670020',
    fiscalCode: '12345670020',
    contactPerson: 'Paolo Neri',
    email: 'paolo.neri@nordicaimpianti.it',
    pec: 'paolo.neri@pec.nordicaimpianti.it',
    phone: '055 8889900',
    mobile: '346 8889900',
    address: 'Via del Lavoro 30',
    postalCode: '50053',
    city: 'Empoli',
    province: 'FI',
    country: 'Italia',
    notes: 'Cliente premium per servizi di progettazione.',
    status: 'active',
    updatedAt: '2026-07-08T13:10:00.000Z',
  },
  {
    id: 'CLI-007',
    code: 'CLI-007',
    clientType: 'private',
    companyName: '',
    firstName: 'Matteo',
    lastName: 'Sala',
    vatNumber: '',
    fiscalCode: 'SLAMTT85A10D612Z',
    contactPerson: 'Matteo Sala',
    email: 'matteo.sala@email.it',
    pec: '',
    phone: '055 1237890',
    mobile: '333 9876543',
    address: 'Via del Sole 7',
    postalCode: '50127',
    city: 'Firenze',
    province: 'FI',
    country: 'Italia',
    notes: 'Privato con servizio di consulenza occasionale.',
    status: 'archived',
    updatedAt: '2026-06-30T12:00:00.000Z',
  },
  {
    id: 'CLI-008',
    code: 'CLI-008',
    clientType: 'company',
    companyName: 'Eco Verde s.r.l.',
    firstName: '',
    lastName: '',
    vatNumber: 'IT12345670021',
    fiscalCode: '12345670021',
    contactPerson: 'Chiara Ferri',
    email: 'chiara.ferri@ecoverde.it',
    pec: 'chiara.ferri@pec.ecoverde.it',
    phone: '055 4455667',
    mobile: '345 4455667',
    address: 'Viale delle Colline 45',
    postalCode: '50018',
    city: 'Scandicci',
    province: 'FI',
    country: 'Italia',
    notes: 'Cliente con trattamento di rinnovo annuale.',
    status: 'active',
    updatedAt: '2026-07-05T09:40:00.000Z',
  },
];

const CLIENTS_STORAGE_KEY = 'praticheoffice.clients.v1';

const clientsSeed: ClientRecord[] = clientsSeedBase.map((seed) => ({
  ...seed,
  createdAt: seed.updatedAt,
  createdBy: 'Sistema',
  updatedBy: 'Sistema',
  version: 1,
}));

let clientsStore: ClientRecord[] = loadPersistedArray(CLIENTS_STORAGE_KEY, clientsSeed).map((client) => normalizeClientRecord(client));
let syncState: ClientsSyncState = {
  status: 'idle',
  message: 'Cache locale dei clienti pronta.',
  lastSyncAt: null,
};
let bootstrapPromise: Promise<ClientRecord[]> | null = null;
const syncListeners = new Set<() => void>();

function createIsoNow(): string {
  return new Date().toISOString();
}

function createUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeText(value: unknown): string {
  return String(value ?? '').trim();
}

function normalizeVersion(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
}

function normalizeClientRecord(client: Partial<ClientRecord>): ClientRecord {
  const createdAt = normalizeText(client.createdAt) || normalizeText(client.updatedAt) || createIsoNow();
  const updatedAt = normalizeText(client.updatedAt) || createdAt;
  const companyName = normalizeText(client.companyName);
  const firstName = normalizeText(client.firstName);
  const lastName = normalizeText(client.lastName);
  const contactPerson = normalizeText(client.contactPerson) || [firstName, lastName].filter(Boolean).join(' ') || companyName;

  return {
    id: normalizeText(client.id) || createUuid(),
    code: normalizeText(client.code) || 'CLI-000',
    clientType: (client.clientType as ClientType) || 'company',
    companyName,
    firstName,
    lastName,
    vatNumber: normalizeText(client.vatNumber),
    fiscalCode: normalizeText(client.fiscalCode),
    contactPerson,
    email: normalizeText(client.email),
    pec: normalizeText(client.pec),
    phone: normalizeText(client.phone),
    mobile: normalizeText(client.mobile),
    address: normalizeText(client.address),
    postalCode: normalizeText(client.postalCode),
    city: normalizeText(client.city),
    province: normalizeText(client.province),
    country: normalizeText(client.country) || 'Italia',
    notes: normalizeText(client.notes),
    status: (client.status as ClientStatus) || 'active',
    createdAt,
    createdBy: normalizeText(client.createdBy) || 'Sistema',
    updatedAt,
    updatedBy: normalizeText(client.updatedBy) || normalizeText(client.createdBy) || 'Sistema',
    version: normalizeVersion(client.version),
  };
}

function persistClientsStore(records: ClientRecord[]): ClientRecord[] {
  clientsStore = records.map((client) => normalizeClientRecord(client));
  savePersistedArray(CLIENTS_STORAGE_KEY, clientsStore);
  return getClients();
}

function replaceClientInStore(record: ClientRecord): ClientRecord[] {
  const normalized = normalizeClientRecord(record);
  const exists = clientsStore.some((candidate) => candidate.id === normalized.id);
  const next = exists ? clientsStore.map((candidate) => (candidate.id === normalized.id ? normalized : candidate)) : [normalized, ...clientsStore];
  return persistClientsStore(next);
}

function removeClientFromStore(id: string): ClientRecord[] {
  return persistClientsStore(clientsStore.filter((client) => client.id !== id));
}

function mergeCloudClients(localClients: ClientRecord[], cloudClients: ClientRecord[]): ClientRecord[] {
  const mergedById = new Map<string, ClientRecord>();

  localClients.forEach((client) => {
    mergedById.set(client.id, normalizeClientRecord(client));
  });

  cloudClients.forEach((remoteClient) => {
    const normalizedRemote = normalizeClientRecord(remoteClient);
    const localClient = mergedById.get(normalizedRemote.id);

    if (!localClient) {
      mergedById.set(normalizedRemote.id, normalizedRemote);
      return;
    }

    if (normalizedRemote.version > localClient.version) {
      mergedById.set(normalizedRemote.id, normalizedRemote);
      return;
    }

    if (normalizedRemote.version === localClient.version && normalizedRemote.updatedAt >= localClient.updatedAt) {
      mergedById.set(normalizedRemote.id, normalizedRemote);
    }
  });

  return Array.from(mergedById.values()).sort((left, right) => {
    if (left.code !== right.code) {
      return left.code.localeCompare(right.code);
    }

    return left.updatedAt.localeCompare(right.updatedAt);
  });
}

function getActorEmail(): string {
  return getGoogleCloudSession()?.email || 'local';
}

function isLikelyOfflineError(error: unknown): boolean {
  if (isCloudAuthError(error)) {
    return true;
  }

  if (error instanceof TypeError) {
    return true;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return message.includes('fetch') || message.includes('network') || message.includes('offline') || message.includes('failed to load');
  }

  return false;
}

function setSyncState(next: Partial<ClientsSyncState>): void {
  syncState = {
    ...syncState,
    ...next,
  };

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('praticheoffice:clients-sync-state-changed', {
        detail: getClientsSyncState(),
      }),
    );
  }

  syncListeners.forEach((listener) => listener());
}

function getCloudConfigReady(): boolean {
  const config = loadCloudConfig();
  return Boolean(config.webAppUrl.trim());
}

async function pushClientToCloud(action: 'clients.create' | 'clients.update' | 'clients.delete', payload: Record<string, unknown>): Promise<unknown> {
  const config = loadCloudConfig();
  return callGoogleCloud(config, action, payload);
}

async function syncClientsFromCloud(): Promise<ClientRecord[]> {
  if (!getCloudConfigReady()) {
    setSyncState({
      status: 'idle',
      message: 'Cache locale dei clienti pronta.',
    });
    return getClients();
  }

  setSyncState({
    status: 'syncing',
    message: 'Sincronizzazione clienti in corso…',
  });

  try {
    const config = loadCloudConfig();
    const remoteClients = await callGoogleCloud<ClientRecord[]>(config, 'clients.list', {});
    const merged = mergeCloudClients(clientsStore, remoteClients.map((client) => normalizeClientRecord(client)));
    const saved = persistClientsStore(merged);

    setSyncState({
      status: 'synced',
      message: 'Clienti sincronizzati con Google Sheets.',
      lastSyncAt: createIsoNow(),
    });

    return saved;
  } catch (error) {
    if (isCloudAuthError(error) || isLikelyOfflineError(error)) {
      setSyncState({
        status: 'offline',
        message: 'Modalità offline: uso della cache locale dei clienti.',
      });
      return getClients();
    }

    setSyncState({
      status: 'error',
      message: error instanceof Error ? error.message : 'Impossibile sincronizzare i clienti con il cloud.',
    });
    throw error;
  }
}

export const getClientsSyncState = (): ClientsSyncState => ({ ...syncState });

export const subscribeClientsSyncState = (listener: () => void): (() => void) => {
  syncListeners.add(listener);
  return () => {
    syncListeners.delete(listener);
  };
};

export const bootstrapClientsCloudSync = async (): Promise<ClientRecord[]> => {
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  bootstrapPromise = syncClientsFromCloud().finally(() => {
    bootstrapPromise = null;
  });

  return bootstrapPromise;
};

export const refreshClientsFromCloud = async (): Promise<ClientRecord[]> => bootstrapClientsCloudSync();

export const getClients = (): ClientRecord[] => clientsStore.map((client) => ({ ...client }));

export const getClientDisplayName = (client: ClientRecord | undefined): string => {
  if (!client) {
    return 'Cliente non assegnato';
  }

  return [client.companyName, `${client.firstName} ${client.lastName}`.trim()].filter(Boolean).join(' ') || client.contactPerson;
};

export const getClientById = (id: string): ClientRecord | undefined => clientsStore.find((client) => client.id === id);

export const filterClients = (
  clients: ClientRecord[],
  search: string,
  type: ClientType | 'all',
  status: ClientStatus | 'all',
): ClientRecord[] => {
  const normalized = search.trim().toLowerCase();

  return clients.filter((client) => {
    const displayName = `${client.companyName} ${client.firstName} ${client.lastName}`.trim().toLowerCase();
    const matchesSearch =
      normalized.length === 0 ||
      client.code.toLowerCase().includes(normalized) ||
      displayName.includes(normalized) ||
      client.contactPerson.toLowerCase().includes(normalized) ||
      client.email.toLowerCase().includes(normalized) ||
      client.city.toLowerCase().includes(normalized);

    const matchesType = type === 'all' || client.clientType === type;
    const matchesStatus = status === 'all' || client.status === status;

    return matchesSearch && matchesType && matchesStatus;
  });
};

export const addClient = async (client: ClientRecord): Promise<ClientRecord[]> => {
  const now = createIsoNow();
  const actor = getActorEmail();
  const existing = getClientById(client.id);
  const nextClient = normalizeClientRecord({
    ...existing,
    ...client,
    id: client.id || existing?.id || createUuid(),
    code: client.code || existing?.code || 'CLI-000',
    createdAt: existing?.createdAt || client.createdAt || now,
    createdBy: existing?.createdBy || client.createdBy || actor,
    updatedAt: now,
    updatedBy: actor,
    version: existing?.version || client.version || 1,
  });

  replaceClientInStore(nextClient);

  try {
    const saved = await pushClientToCloud('clients.create', { ...nextClient });
    if (saved && typeof saved === 'object') {
      replaceClientInStore(normalizeClientRecord(saved as Partial<ClientRecord>));
    }

    setSyncState({
      status: 'synced',
      message: 'Cliente sincronizzato con Google Sheets.',
      lastSyncAt: createIsoNow(),
    });
    return getClients();
  } catch (error) {
    setSyncState({
      status: isCloudAuthError(error) || isLikelyOfflineError(error) ? 'offline' : 'error',
      message: isCloudAuthError(error) || isLikelyOfflineError(error)
        ? 'Cliente salvato in cache locale. Sincronizzazione cloud non disponibile.'
        : error instanceof Error
          ? error.message
          : 'Impossibile sincronizzare il cliente.',
    });

    throw error instanceof Error ? error : new Error('Impossibile sincronizzare il cliente.');
  }
};

export const updateClient = async (client: ClientRecord): Promise<ClientRecord[]> => {
  const current = getClientById(client.id);
  if (!current) {
    throw new Error('Cliente non trovato.');
  }

  const now = createIsoNow();
  const actor = getActorEmail();
  const nextClient = normalizeClientRecord({
    ...current,
    ...client,
    id: current.id,
    code: current.code,
    createdAt: current.createdAt,
    createdBy: current.createdBy,
    updatedAt: now,
    updatedBy: actor,
    version: current.version + 1,
  });

  replaceClientInStore(nextClient);

  try {
    const saved = await pushClientToCloud('clients.update', { ...nextClient });
    if (saved && typeof saved === 'object') {
      replaceClientInStore(normalizeClientRecord(saved as Partial<ClientRecord>));
    }

    setSyncState({
      status: 'synced',
      message: 'Cliente aggiornato su Google Sheets.',
      lastSyncAt: createIsoNow(),
    });
    return getClients();
  } catch (error) {
    setSyncState({
      status: isCloudAuthError(error) || isLikelyOfflineError(error) ? 'offline' : 'error',
      message: isCloudAuthError(error) || isLikelyOfflineError(error)
        ? 'Aggiornamento salvato in cache locale. Sincronizzazione cloud non disponibile.'
        : error instanceof Error
          ? error.message
          : 'Impossibile aggiornare il cliente.',
    });

    throw error instanceof Error ? error : new Error('Impossibile aggiornare il cliente.');
  }
};

export const deleteClient = async (clientId: string): Promise<ClientRecord[]> => {
  const current = getClientById(clientId);
  if (!current) {
    return getClients();
  }

  try {
    await pushClientToCloud('clients.delete', { id: clientId, version: current.version });
    removeClientFromStore(clientId);
    setSyncState({
      status: 'synced',
      message: 'Cliente eliminato da Google Sheets.',
      lastSyncAt: createIsoNow(),
    });
    return getClients();
  } catch (error) {
    setSyncState({
      status: isCloudAuthError(error) || isLikelyOfflineError(error) ? 'offline' : 'error',
      message: isCloudAuthError(error) || isLikelyOfflineError(error)
        ? 'Eliminazione non eseguita: il cloud non è disponibile.'
        : error instanceof Error
          ? error.message
          : 'Impossibile eliminare il cliente.',
    });

    throw error instanceof Error ? error : new Error('Impossibile eliminare il cliente.');
  }
};
