import type { EntityId } from './EntityId';

export interface TimestampedEntity {
  id: EntityId;
  createdAt: string;
  updatedAt: string;
}
