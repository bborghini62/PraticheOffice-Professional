import type { EntityId } from '../common/EntityId';
import type { TimestampedEntity } from '../common/TimestampedEntity';

export interface Workflow extends TimestampedEntity {
  code: string;
  name: string;
  description?: string;
  stageIds: EntityId[];
  initialStageId: EntityId;
  active: boolean;
}
