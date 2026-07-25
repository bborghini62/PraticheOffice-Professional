import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';

export interface Role extends TimestampedEntity {
  code: string;
  name: string;
  description?: string;
  permissionIds: EntityId[];
  isSystem: boolean;
}
