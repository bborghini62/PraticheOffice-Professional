import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';
import type { EntityStatus } from '../common/EntityStatus';

export interface WorkGroup extends TimestampedEntity {
  name: string;
  description?: string;
  managerUserId?: EntityId;
  memberIds: EntityId[];
  status: EntityStatus;
}
