import type { GroupRecord } from '../groups.types';

const initialGroups: GroupRecord[] = [
  {
    id: 'grp-001',
    name: 'Ufficio tecnico',
    description: 'Gruppo tecnico e coordinamento pratiche edilizie.',
    responsible: 'Laura Bianchi',
    status: 'active',
    createdAt: '2026-07-01',
    updatedAt: '2026-07-24',
  },
  {
    id: 'grp-002',
    name: 'Amministrazione',
    description: 'Supporto amministrativo e gestione documentale.',
    responsible: 'Marco Rossi',
    status: 'active',
    createdAt: '2026-07-01',
    updatedAt: '2026-07-24',
  },
  {
    id: 'grp-003',
    name: 'Segreteria',
    description: 'Gestione contatti e archiviazione operativa.',
    responsible: 'Elena Bassi',
    status: 'active',
    createdAt: '2026-07-02',
    updatedAt: '2026-07-22',
  },
  {
    id: 'grp-004',
    name: 'Direzione',
    description: 'Gruppo direttivo per verifiche e approvazioni.',
    responsible: 'Giulia Ferri',
    status: 'active',
    createdAt: '2026-07-03',
    updatedAt: '2026-07-20',
  },
];

let groupsStore: GroupRecord[] = [...initialGroups];

export const getGroups = (): GroupRecord[] => groupsStore.map((group) => ({ ...group }));
export const getActiveGroups = (): GroupRecord[] => getGroups().filter((group) => group.status === 'active');

export const getGroupById = (groupId: string): GroupRecord | undefined => getGroups().find((group) => group.id === groupId);

export const createGroup = (group: Omit<GroupRecord, 'id' | 'createdAt' | 'updatedAt'>): GroupRecord => {
  const nextGroup: GroupRecord = {
    ...group,
    id: `grp-${String(groupsStore.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  groupsStore = [nextGroup, ...groupsStore];
  return { ...nextGroup };
};

export const updateGroup = (groupId: string, updates: Partial<GroupRecord>): GroupRecord | undefined => {
  const current = groupsStore.find((group) => group.id === groupId);
  if (!current) {
    return undefined;
  }

  const nextGroup: GroupRecord = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  groupsStore = groupsStore.map((group) => (group.id === groupId ? nextGroup : group));
  return { ...nextGroup };
};

export const archiveGroup = (groupId: string): GroupRecord | undefined => updateGroup(groupId, { status: 'archived' });
export const reactivateGroup = (groupId: string): GroupRecord | undefined => updateGroup(groupId, { status: 'active' });

export const filterGroups = (groups: GroupRecord[], search: string, status: GroupRecord['status'] | 'all') => {
  const normalized = search.trim().toLowerCase();
  return groups.filter((group) => {
    const matchesSearch = normalized.length === 0 || [group.name, group.description, group.responsible].some((value) => value.toLowerCase().includes(normalized));
    const matchesStatus = status === 'all' || group.status === status;
    return matchesSearch && matchesStatus;
  });
};

export const getGroupOptions = () => getActiveGroups().map((group) => ({ value: group.name, label: group.name }));
