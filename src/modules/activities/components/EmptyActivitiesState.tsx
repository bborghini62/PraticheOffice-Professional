import { EmptyState } from '../../../design/components';

interface EmptyActivitiesStateProps {
  onReset: () => void;
}

export const EmptyActivitiesState = ({ onReset }: EmptyActivitiesStateProps) => (
  <EmptyState title="Nessuna attività trovata" description="Prova a cambiare i filtri oppure creare una nuova attività dalla sezione dedicata." actionLabel="Azzera filtri" onAction={onReset} />
);
