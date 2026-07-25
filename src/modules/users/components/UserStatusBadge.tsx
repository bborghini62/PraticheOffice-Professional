import { StatusBadge } from '../../../design/components';
import type { UserStatus } from '../users.types';

interface UserStatusBadgeProps {
  status: UserStatus;
}

export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  const resolvedStatus = status.toLowerCase();

  return <StatusBadge status={resolvedStatus} />;
};
