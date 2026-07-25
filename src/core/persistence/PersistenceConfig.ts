export type PersistenceType = 'InMemory' | 'SQLite' | 'GoogleDrive' | 'Dropbox';

export interface PersistenceConfig {
  type: PersistenceType;
  enabled: boolean;
}

export const defaultPersistenceConfig: PersistenceConfig = {
  type: 'InMemory',
  enabled: true,
};
