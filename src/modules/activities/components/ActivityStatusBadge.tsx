import { StatusBadge } from '../../../design/components';
import type { ActivityStatus } from '../activities.types';

const statusColors: Record<ActivityStatus, 'default' | 'secondary' | 'error' | 'success'> = {
  todo: 'default',
  in_progress: 'secondary',
  blocked: 'error',
  completed: 'success',
  cancelled: 'default',
};

interface ActivityStatusBadgeProps {
  status: ActivityStatus;
}

export const ActivityStatusBadge = ({ status }: ActivityStatusBadgeProps) => <StatusBadge status={status} sx={{ bgcolor: statusColors[status] === 'default' ? 'grey.100' : undefined }} />;
