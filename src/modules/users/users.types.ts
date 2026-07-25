export type UserRole = 'Administrator' | 'Supervisor' | 'Operator' | 'Collaborator' | 'Viewer';
export type UserStatus = 'Active' | 'Suspended' | 'Disabled';
export type UserLanguage = 'it-IT' | 'en-US';

export interface UserRecord {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  qualification: string;
  department: string;
  group: string;
  role: UserRole;
  status: UserStatus;
  language: UserLanguage;
  timeZone: string;
  password: string;
  mustChangePassword: boolean;
  lastAccessAt: string;
  createdAt: string;
  isDemoUser?: boolean;
}

export interface UsersFilters {
  search: string;
  role: string;
  status: string;
  group: string;
  department: string;
}

export interface NewUserPayload {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  qualification: string;
  department: string;
  group: string;
  role: UserRole;
  status: UserStatus;
  language: UserLanguage;
  timeZone: string;
  password: string;
  confirmPassword: string;
  mustChangePassword: boolean;
}
