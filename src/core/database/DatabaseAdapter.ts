import type { DatabaseRow, QueryParameters, QueryResult, TransactionCallback } from './database.types';

export interface DatabaseAdapter {
  initialize(): Promise<void>;
  close(): Promise<void>;
  execute<TData = DatabaseRow>(query: string, parameters?: QueryParameters): Promise<QueryResult<TData>>;
  query<TData = DatabaseRow>(query: string): Promise<QueryResult<TData>>;
  transaction<TContext = unknown>(callback: TransactionCallback<TContext>, context?: TContext): Promise<void>;
  isInitialized(): boolean;
}
