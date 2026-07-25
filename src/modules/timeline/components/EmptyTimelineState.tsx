import { EmptyState } from '../../../design/components';

interface EmptyTimelineStateProps {
  onAction?: () => void;
}

export const EmptyTimelineState = ({ onAction }: EmptyTimelineStateProps) => (
  <EmptyState title="Nessun evento presente" description="La timeline della pratica sarà popolata automaticamente dagli eventi principali del progetto." actionLabel="Chiudi" onAction={onAction} />
);
