import type { PersistenceProvider } from '../PersistenceProvider';

export class SQLitePersistenceProvider implements PersistenceProvider {
  async initialize(): Promise<void> {
    // Not implemented.
  }

  async shutdown(): Promise<void> {
    // Not implemented.
  }

  async save<TValue>(_key: string, _value: TValue): Promise<void> {
    // Not implemented.
  }

  async load<TValue>(_key: string): Promise<TValue | null> {
    return null;
  }

  async remove(_key: string): Promise<void> {
    // Not implemented.
  }

  async clear(): Promise<void> {
    // Not implemented.
  }

  isAvailable(): boolean {
    return false;
  }
}
