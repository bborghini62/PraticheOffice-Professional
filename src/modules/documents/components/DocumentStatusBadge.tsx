import { StatusBadge } from '../../../design/components';

interface DocumentStatusBadgeProps {
  status: string;
}

export const DocumentStatusBadge = ({ status }: DocumentStatusBadgeProps) => {
  const normalized = status === 'draft' ? 'draft' : status === 'active' ? 'active' : status === 'signed' ? 'approved' : status === 'expired' ? 'cancelled' : 'archived';
  return <StatusBadge status={normalized} />;
};
