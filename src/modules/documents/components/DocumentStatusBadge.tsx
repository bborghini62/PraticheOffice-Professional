import { StatusBadge } from '../../../design/components';

interface DocumentStatusBadgeProps {
  status: string;
}

export const DocumentStatusBadge = ({ status }: DocumentStatusBadgeProps) => <StatusBadge status={status} />;
