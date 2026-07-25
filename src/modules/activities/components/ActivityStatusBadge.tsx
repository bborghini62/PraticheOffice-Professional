import { Chip } from '@mui/material';
import type { ActivityStatus } from '../activities.types';

const statusLabels: Record<ActivityStatus, string> = {
  todo: 'Da fare',
  in_progress: 'In corso',
  blocked: 'Bloccata',
  completed: 'Completata',
  cancelled: 'Annullata',
};

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

export const ActivityStatusBadge = ({ status }: ActivityStatusBadgeProps) => <Chip label={statusLabels[status]} color={statusColors[status]} size="small" sx={{ borderRadius: 999, fontWeight: 600 }} />;
