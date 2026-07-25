import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';

export interface WorkflowTransition extends TimestampedEntity {
  workflowId: EntityId;
  fromStageId: EntityId;
  toStageId: EntityId;
  name: string;
  requiresPermissionCode?: string;
}
