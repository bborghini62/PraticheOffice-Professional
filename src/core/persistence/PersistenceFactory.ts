import { configService } from '../config';
import { InMemoryPersistenceProvider } from './providers/InMemoryPersistenceProvider';
import { DropboxPersistenceProvider } from './providers/DropboxPersistenceProvider';
import { GoogleDrivePersistenceProvider } from './providers/GoogleDrivePersistenceProvider';
import { SQLitePersistenceProvider } from './providers/SQLitePersistenceProvider';
import type { PersistenceProvider } from './PersistenceProvider';
import type { PersistenceType } from './PersistenceConfig';

export class PersistenceFactory {
  createProvider(type?: PersistenceType): PersistenceProvider {
    const persistenceType = type ?? (configService.get('persistence.type') as PersistenceType | undefined) ?? 'InMemory';

    switch (persistenceType) {
      case 'SQLite':
        return new SQLitePersistenceProvider();
      case 'GoogleDrive':
        return new GoogleDrivePersistenceProvider();
      case 'Dropbox':
        return new DropboxPersistenceProvider();
      case 'InMemory':
      default:
        return new InMemoryPersistenceProvider();
    }
  }
}

export const persistenceFactory = new PersistenceFactory();
