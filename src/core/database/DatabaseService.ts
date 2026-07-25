import { logger } from '../logging';
import { databaseConfig } from './databaseConfig';
import type { DatabaseAdapter } from './DatabaseAdapter';
import type { DatabaseRow, DatabaseStatus, QueryParameters, QueryResult, TransactionCallback } from './database.types';
import { InMemoryDatabaseAdapter } from './adapters';

export class DatabaseService {
  private static instance: DatabaseService | null = null;
  private adapter: DatabaseAdapter;
  private status: DatabaseStatus = 'idle';

  private constructor(adapter?: DatabaseAdapter) {
    this.adapter = adapter ?? this.createDefaultAdapter();
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }

  async initialize(): Promise<void> {
    if (this.status === 'ready' || this.status === 'initializing') {
      return;
    }

    this.status = 'initializing';

    try {
      await this.adapter.initialize();
      this.status = 'ready';
      logger.info('Database initialized', { component: 'DatabaseService' }, { database: databaseConfig.logicalName });
    } catch (error) {
      this.status = 'error';
      logger.error('Database initialization failed', { component: 'DatabaseService' }, { error });
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.status === 'closed' || this.status === 'idle') {
      return;
    }

    try {
      await this.adapter.close();
      this.status = 'closed';
    } catch (error) {
      this.status = 'error';
      logger.error('Database close failed', { component: 'DatabaseService' }, { error });
      throw error;
    }
  }

  async execute<TData = DatabaseRow>(query: string, parameters?: QueryParameters): Promise<QueryResult<TData>> {
    this.ensureReady();

    try {
      return await this.adapter.execute<TData>(query, parameters);
    } catch (error) {
      logger.error('Database execute failed', { component: 'DatabaseService' }, { error, query, parameters });
      throw error;
    }
  }

  async query<TData = DatabaseRow>(query: string): Promise<QueryResult<TData>> {
    this.ensureReady();

    try {
      return await this.adapter.query<TData>(query);
    } catch (error) {
      logger.error('Database query failed', { component: 'DatabaseService' }, { error, query });
      throw error;
    }
  }

  async transaction<TContext = unknown>(callback: TransactionCallback<TContext>, context?: TContext): Promise<void> {
    this.ensureReady();

    try {
      await this.adapter.transaction(callback, context);
    } catch (error) {
      logger.error('Database transaction failed', { component: 'DatabaseService' }, { error });
      throw error;
    }
  }

  isInitialized(): boolean {
    return this.status === 'ready' || this.adapter.isInitialized();
  }

  private ensureReady(): void {
    if (!this.adapter.isInitialized()) {
      throw new Error('Database service is not initialized');
    }
  }

  private createDefaultAdapter(): DatabaseAdapter {
    if (databaseConfig.defaultAdapter === 'in-memory') {
      return new InMemoryDatabaseAdapter();
    }

    return new InMemoryDatabaseAdapter();
  }
}

export const databaseService = DatabaseService.getInstance();
