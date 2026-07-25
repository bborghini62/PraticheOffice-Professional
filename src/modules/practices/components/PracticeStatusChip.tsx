import { Chip } from '@mui/material';
import type { PracticeStatus } from '../practices.types';

interface PracticeStatusChipProps {
  status: PracticeStatus;
}

const statusLabels: Record<PracticeStatus, string> = {
  draft: 'Bozza',
  open: 'Aperta',
  in_progress: 'In lavorazione',
  waiting: 'In attesa',
  under_review: 'Da controllare',
  approved: 'Approvata',
  completed: 'Completata',
  archived: 'Archiviata',
  cancelled: 'Annullata',
};

const statusColors: Record<PracticeStatus, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
  draft: 'default',
  open: 'primary',
  in_progress: 'secondary',
  waiting: 'warning',
  under_review: 'warning',
  approved: 'success',
  completed: 'success',
  archived: 'default',
  cancelled: 'error',
};

export const PracticeStatusChip = ({ status }: PracticeStatusChipProps) => (
  <Chip label={statusLabels[status]} color={statusColors[status]} size="small" variant="outlined" />
);
