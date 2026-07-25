import { EmptyState } from '../../../design/components';

interface EmptyDocumentsStateProps {
  onReset?: () => void;
}

export const EmptyDocumentsState = ({ onReset }: EmptyDocumentsStateProps) => (
  <EmptyState title="Nessun documento trovato" description="Modifica i filtri o registra un nuovo documento per iniziare." actionLabel="Azzera filtri" onAction={onReset} />
);
