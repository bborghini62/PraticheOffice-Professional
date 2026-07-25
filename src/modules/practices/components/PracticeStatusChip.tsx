import { StatusBadge } from '../../../design/components';
import type { PracticeStatus } from '../practices.types';

interface PracticeStatusChipProps {
  status: PracticeStatus;
}

export const PracticeStatusChip = ({ status }: PracticeStatusChipProps) => <StatusBadge status={status} />;
