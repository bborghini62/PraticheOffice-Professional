export type ClientType = 'company' | 'private' | 'public_entity' | 'professional' | 'association';

export type ClientStatus = 'active' | 'inactive' | 'archived';

export interface ClientRecord {
  id: string;
  code: string;
  clientType: ClientType;
  companyName: string;
  firstName: string;
  lastName: string;
  vatNumber: string;
  fiscalCode: string;
  contactPerson: string;
  email: string;
  pec: string;
  phone: string;
  mobile: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  notes: string;
  status: ClientStatus;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  version: number;
}

export interface ClientsFilters {
  search: string;
  type: ClientType | 'all';
  status: ClientStatus | 'all';
}
