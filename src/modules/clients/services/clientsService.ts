import type { ClientRecord, ClientStatus, ClientType } from '../clients.types';
import { loadPersistedArray, savePersistedArray } from '../../../core/persistence/localStorageStore';

const clientsSeed: ClientRecord[] = [
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
    updatedAt: '2026-07-20',
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
    updatedAt: '2026-07-18',
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
    updatedAt: '2026-07-15',
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
    updatedAt: '2026-07-12',
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
    updatedAt: '2026-07-10',
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
    updatedAt: '2026-07-08',
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
    updatedAt: '2026-06-30',
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
    updatedAt: '2026-07-05',
  },
];

const CLIENTS_STORAGE_KEY = 'praticheoffice.clients.v1';
let clientsStore: ClientRecord[] = loadPersistedArray(CLIENTS_STORAGE_KEY, clientsSeed);

export const getClients = (): ClientRecord[] => clientsStore.map((client) => ({ ...client }));

export const getClientDisplayName = (client: ClientRecord | undefined): string => {
  if (!client) {
    return 'Cliente non assegnato';
  }

  return [client.companyName, `${client.firstName} ${client.lastName}`.trim()].filter(Boolean).join(' ') || client.contactPerson;
};

export const addClient = (client: ClientRecord): ClientRecord[] => {
  clientsStore = [client, ...clientsStore];
  savePersistedArray(CLIENTS_STORAGE_KEY, clientsStore);
  return getClients();
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
