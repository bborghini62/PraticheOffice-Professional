import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';
import type { TaskPriority } from './TaskPriority';
import type { TaskStatus } from './TaskStatus';

export interface WorkTask extends TimestampedEntity {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeUserId?: EntityId;
  groupId?: EntityId;
  workspaceId?: EntityId;
  dueAt?: string;
  completedAt?: string;
}
