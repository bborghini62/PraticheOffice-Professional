export interface GroupRecord {
  id: string;
  name: string;
  description: string;
  responsible: string;
  managerUserId?: string;
  memberUserIds: string[];
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface GroupsFilters {
  search: string;
  status: 'all' | GroupRecord['status'];
}
