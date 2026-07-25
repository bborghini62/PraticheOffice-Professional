import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';
import type { DocumentStatus } from './DocumentStatus';

export interface Document extends TimestampedEntity {
  name: string;
  description?: string;
  mimeType: string;
  size: number;
  status: DocumentStatus;
  currentVersionId?: EntityId;
  ownerUserId: EntityId;
  workspaceId?: EntityId;
}
