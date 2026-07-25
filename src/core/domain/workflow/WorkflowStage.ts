import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';

export interface WorkflowStage extends TimestampedEntity {
  workflowId: EntityId;
  code: string;
  name: string;
  description?: string;
  order: number;
  terminal: boolean;
}
