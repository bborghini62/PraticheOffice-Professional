import type { UserRecord, UserRole, UserStatus, UsersFilters } from '../users.types';

const storageKeys = {
  users: 'praticheoffice-users',
};

const initialUsers: UserRecord[] = [
  {
    id: 'user-admin',
    code: 'USR-001',
    firstName: 'Bruno',
    lastName: 'Borghini',
    displayName: 'Admin Demo',
    email: 'amministratore@praticheoffice.local',
    phone: '+39 333 111 2222',
    qualification: 'Direttore operativo',
    department: 'Amministrazione',
    group: 'Executive',
    role: 'Administrator',
    status: 'Active',
    language: 'it-IT',
    timeZone: 'Europe/Rome',
    password: 'Admin123!',
    mustChangePassword: false,
    lastAccessAt: '2026-07-25T09:15:00.000Z',
    createdAt: '2026-07-01T08:00:00.000Z',
    isDemoUser: true,
  },
  {
    id: 'user-operator',
    code: 'USR-002',
    firstName: 'Marco',
    lastName: 'Rossi',
    displayName: 'Operatore Demo',
    email: 'operatore@praticheoffice.local',
    phone: '+39 333 444 5555',
    qualification: 'Operatore senior',
    department: 'Operativo',
    group: 'Operations',
    role: 'Operator',
    status: 'Active',
    language: 'it-IT',
    timeZone: 'Europe/Rome',
    password: 'Operatore123!',
    mustChangePassword: false,
    lastAccessAt: '2026-07-25T07:45:00.000Z',
    createdAt: '2026-07-02T09:30:00.000Z',
    isDemoUser: true,
  },
  {
    id: 'user-supervisor',
    code: 'USR-003',
    firstName: 'Laura',
    lastName: 'Mancini',
    displayName: 'Laura Mancini',
    email: 'laura.mancini@praticheoffice.local',
    phone: '+39 333 666 7777',
    qualification: 'Supervisore practice',
    department: 'Operativo',
    group: 'Operations',
    role: 'Supervisor',
    status: 'Active',
    language: 'it-IT',
    timeZone: 'Europe/Rome',
    password: 'Demo1234!',
    mustChangePassword: true,
    lastAccessAt: '2026-07-24T16:10:00.000Z',
    createdAt: '2026-07-03T10:00:00.000Z',
    isDemoUser: true,
  },
  {
    id: 'user-collaborator',
    code: 'USR-004',
    firstName: 'Elena',
    lastName: 'Galli',
    displayName: 'Elena Galli',
    email: 'elena.galli@praticheoffice.local',
    phone: '+39 333 888 9999',
    qualification: 'Collaboratrice legale',
    department: 'Legale',
    group: 'Legal',
    role: 'Collaborator',
    status: 'Active',
    language: 'it-IT',
    timeZone: 'Europe/Rome',
    password: 'Demo1234!',
    mustChangePassword: false,
    lastAccessAt: '2026-07-23T13:20:00.000Z',
    createdAt: '2026-07-04T11:15:00.000Z',
    isDemoUser: true,
  },
  {
    id: 'user-viewer',
    code: 'USR-005',
    firstName: 'Paolo',
    lastName: 'Bianchi',
    displayName: 'Paolo Bianchi',
    email: 'paolo.bianchi@praticheoffice.local',
    phone: '+39 333 222 3333',
    qualification: 'Analista report',
    department: 'Controllo',
    group: 'Reporting',
    role: 'Viewer',
    status: 'Suspended',
    language: 'it-IT',
    timeZone: 'Europe/Rome',
    password: 'Demo1234!',
    mustChangePassword: false,
    lastAccessAt: '2026-07-20T10:30:00.000Z',
    createdAt: '2026-07-05T12:00:00.000Z',
    isDemoUser: true,
  },
  {
    id: 'user-6',
    code: 'USR-006',
    firstName: 'Sara',
    lastName: 'Verdi',
    displayName: 'Sara Verdi',
    email: 'sara.verdi@praticheoffice.local',
    phone: '+39 333 444 6666',
    qualification: 'Coordinatrice clienti',
    department: 'Clienti',
    group: 'Client Services',
    role: 'Supervisor',
    status: 'Active',
    language: 'it-IT',
    timeZone: 'Europe/Rome',
    password: 'Demo1234!',
    mustChangePassword: false,
    lastAccessAt: '2026-07-24T14:40:00.000Z',
    createdAt: '2026-07-06T15:20:00.000Z',
    isDemoUser: true,
  },
  {
    id: 'user-7',
    code: 'USR-007',
    firstName: 'Luca',
    lastName: 'Neri',
    displayName: 'Luca Neri',
    email: 'luca.neri@praticheoffice.local',
    phone: '+39 333 555 7777',
    qualification: 'Analista pratiche',
    department: 'Pratiche',
    group: 'Case Management',
    role: 'Operator',
    status: 'Disabled',
    language: 'it-IT',
    timeZone: 'Europe/Rome',
    password: 'Demo1234!',
    mustChangePassword: true,
    lastAccessAt: '2026-07-19T08:00:00.000Z',
    createdAt: '2026-07-08T09:45:00.000Z',
    isDemoUser: true,
  },
  {
    id: 'user-8',
    code: 'USR-008',
    firstName: 'Giulia',
    lastName: 'Ferri',
    displayName: 'Giulia Ferri',
    email: 'giulia.ferri@praticheoffice.local',
    phone: '+39 333 111 4444',
    qualification: 'Assistente amministrativa',
    department: 'Amministrazione',
    group: 'Admin Support',
    role: 'Collaborator',
    status: 'Active',
    language: 'en-US',
    timeZone: 'Europe/London',
    password: 'Demo1234!',
    mustChangePassword: false,
    lastAccessAt: '2026-07-25T06:20:00.000Z',
    createdAt: '2026-07-09T14:00:00.000Z',
    isDemoUser: true,
  },
];

const readUsers = (): UserRecord[] => {
  if (typeof window === 'undefined') {
    return initialUsers;
  }

  const stored = window.localStorage.getItem(storageKeys.users);
  if (!stored) {
    window.localStorage.setItem(storageKeys.users, JSON.stringify(initialUsers));
    return initialUsers;
  }

  try {
    return JSON.parse(stored) as UserRecord[];
  } catch {
    window.localStorage.setItem(storageKeys.users, JSON.stringify(initialUsers));
    return initialUsers;
  }
};

const writeUsers = (users: UserRecord[]) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKeys.users, JSON.stringify(users));
  }
};

export const getUsers = (): UserRecord[] => readUsers();

export const getUserById = (userId: string) => getUsers().find((user) => user.id === userId);

export const filterUsers = (users: UserRecord[], filters: UsersFilters) => {
  const normalizedSearch = filters.search.toLowerCase();

  return users.filter((user) => {
    const matchesSearch = [user.code, user.firstName, user.lastName, user.displayName, user.email].some((value) => value.toLowerCase().includes(normalizedSearch));
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    const matchesGroup = filters.group === 'all' || user.group === filters.group;
    const matchesDepartment = filters.department === 'all' || user.department === filters.department;

    return matchesSearch && matchesRole && matchesStatus && matchesGroup && matchesDepartment;
  });
};

export const createUser = (user: Omit<UserRecord, 'id' | 'code' | 'password' | 'lastAccessAt' | 'createdAt'> & { password: string }) => {
  const users = getUsers();
  const nextUser: UserRecord = {
    ...user,
    id: `user-${users.length + 1}`,
    code: `USR-${(users.length + 1).toString().padStart(3, '0')}`,
    password: user.password,
    lastAccessAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [nextUser, ...users];
  writeUsers(updatedUsers);
  return nextUser;
};

export const updateUser = (userId: string, updates: Partial<UserRecord>) => {
  const users = getUsers();
  const updatedUsers = users.map((user) => (user.id === userId ? { ...user, ...updates } : user));
  writeUsers(updatedUsers);
  return updatedUsers.find((user) => user.id === userId);
};

export const getUserRoleLabel = (role: UserRole) => {
  const labels: Record<UserRole, string> = {
    Administrator: 'Amministratore',
    Supervisor: 'Supervisore',
    Operator: 'Operatore',
    Collaborator: 'Collaboratore',
    Viewer: 'Visualizzatore',
  };

  return labels[role];
};

export const getUserStatusLabel = (status: UserStatus) => {
  const labels: Record<UserStatus, string> = {
    Active: 'Attivo',
    Suspended: 'Sospeso',
    Disabled: 'Disabilitato',
  };

  return labels[status];
};
