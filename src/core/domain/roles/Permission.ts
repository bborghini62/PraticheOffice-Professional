import type { TimestampedEntity } from '../common/TimestampedEntity';

export interface Permission extends TimestampedEntity {
  code: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
}
