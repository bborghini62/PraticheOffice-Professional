export interface PersistenceProvider {
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  save<TValue>(key: string, value: TValue): Promise<void>;
  load<TValue>(key: string): Promise<TValue | null>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  isAvailable(): boolean;
}
