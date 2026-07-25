export type DatabaseStatus = 'idle' | 'initializing' | 'ready' | 'error' | 'closed';

export interface DatabaseRow {
  [key: string]: unknown;
}

export type QueryParameters = Record<string, unknown>;

export interface QueryResult<TData = DatabaseRow> {
  rows: TData[];
  affectedRows: number;
  lastInsertId?: string | number;
}

export type TransactionCallback<TContext = unknown> = (context: TContext) => Promise<void> | void;
