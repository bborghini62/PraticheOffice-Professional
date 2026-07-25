import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';
import type { WorkspaceStatus } from './WorkspaceStatus';

export interface Workspace extends TimestampedEntity {
  name: string;
  description?: string;
  ownerUserId: EntityId;
  status: WorkspaceStatus;
  groupIds: EntityId[];
}
