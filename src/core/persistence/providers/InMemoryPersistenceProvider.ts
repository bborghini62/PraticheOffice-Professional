import type { PersistenceProvider } from '../PersistenceProvider';

export class InMemoryPersistenceProvider implements PersistenceProvider {
  private readonly store = new Map<string, unknown>();

  async initialize(): Promise<void> {
    this.store.clear();
  }

  async shutdown(): Promise<void> {
    this.store.clear();
  }

  async save<TValue>(key: string, value: TValue): Promise<void> {
    this.store.set(key, value);
  }

  async load<TValue>(key: string): Promise<TValue | null> {
    return (this.store.get(key) as TValue | undefined) ?? null;
  }

  async remove(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  isAvailable(): boolean {
    return true;
  }
}
