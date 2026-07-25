import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';

export interface DocumentVersion extends TimestampedEntity {
  documentId: EntityId;
  versionNumber: number;
  storageProvider: string;
  storagePath: string;
  createdByUserId: EntityId;
}
