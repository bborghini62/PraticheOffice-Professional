import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';
import type { UserProfile } from './UserProfile';
import type { UserStatus } from './UserStatus';

export interface User extends TimestampedEntity {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  status: UserStatus;
  profile: UserProfile;
  roleIds: EntityId[];
  groupIds: EntityId[];
}
