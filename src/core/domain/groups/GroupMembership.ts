import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';
import type { GroupRole } from './GroupRole';

export interface GroupMembership extends TimestampedEntity {
  groupId: EntityId;
  userId: EntityId;
  role: GroupRole;
  joinedAt: string;
}
