import type { DatabaseAdapter } from '../DatabaseAdapter';
import type { DatabaseRow, QueryParameters, QueryResult, TransactionCallback } from '../database.types';

export class InMemoryDatabaseAdapter implements DatabaseAdapter {
  private initialized = false;
  private readonly store = new Map<string, DatabaseRow[]>();

  async initialize(): Promise<void> {
    this.initialized = true;
  }

  async close(): Promise<void> {
    this.initialized = false;
    this.store.clear();
  }

  async execute<TData = DatabaseRow>(query: string, parameters?: QueryParameters): Promise<QueryResult<TData>> {
    if (!this.initialized) {
      throw new Error('Database adapter is not initialized');
    }

    const normalized = query.trim().toLowerCase();

    if (normalized.startsWith('insert')) {
      const tableName = this.extractTableName(query);
      const row = parameters ?? {};
      const existing = this.store.get(tableName) ?? [];
      const next = { ...row, id: `row-${existing.length + 1}` };
      const rows = [...existing, next];
      this.store.set(tableName, rows);

      return {
        rows: [next as TData],
        affectedRows: 1,
        lastInsertId: next.id,
      };
    }

    if (normalized.startsWith('delete')) {
      const tableName = this.extractTableName(query);
      const existing = this.store.get(tableName) ?? [];
      this.store.set(tableName, []);

      return {
        rows: existing as TData[],
        affectedRows: existing.length,
      };
    }

    return {
      rows: [],
      affectedRows: 0,
    };
  }

  async query<TData = DatabaseRow>(query: string): Promise<QueryResult<TData>> {
    if (!this.initialized) {
      throw new Error('Database adapter is not initialized');
    }

    const normalized = query.trim().toLowerCase();

    if (normalized.startsWith('select')) {
      const tableName = this.extractTableName(query);
      const rows = this.store.get(tableName) ?? [];

      return {
        rows: rows as TData[],
        affectedRows: rows.length,
      };
    }

    return {
      rows: [],
      affectedRows: 0,
    };
  }

  async transaction<TContext = unknown>(callback: TransactionCallback<TContext>, context?: TContext): Promise<void> {
    if (!this.initialized) {
      throw new Error('Database adapter is not initialized');
    }

    await callback(context as TContext);
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  private extractTableName(query: string): string {
    const match = query.match(/from\s+([a-zA-Z0-9_]+)/i);
    if (match?.[1]) {
      return match[1];
    }

    const insertMatch = query.match(/into\s+([a-zA-Z0-9_]+)/i);
    if (insertMatch?.[1]) {
      return insertMatch[1];
    }

    return 'default';
  }
}
