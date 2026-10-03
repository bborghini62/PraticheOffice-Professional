import { StatusBadge } from '../../../design/components';
import type { UserStatus } from '../users.types';

interface UserStatusBadgeProps {
  status: UserStatus;
}

const statusMap: Record<UserStatus, string> = {
  Active: 'active',
  Suspended: 'suspended',
  Disabled: 'disabled',
};

export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => <StatusBadge status={statusMap[status]} />;
