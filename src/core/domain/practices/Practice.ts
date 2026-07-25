import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';
import type { PracticePriority } from './PracticePriority';
import type { PracticeStatus } from './PracticeStatus';

export interface Practice extends TimestampedEntity {
  code: string;
  title: string;
  description?: string;
  status: PracticeStatus;
  priority: PracticePriority;
  responsibleUserId?: EntityId;
  supervisorUserId?: EntityId;
  collaboratorUserIds: EntityId[];
  groupId?: EntityId;
  workspaceId?: EntityId;
  workflowId?: EntityId;
  currentStageId?: EntityId;
  openedAt: string;
  dueAt?: string;
  closedAt?: string;
}
