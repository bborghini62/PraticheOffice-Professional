import { Box } from '@mui/material';
import { EmptyState } from '../../../design/components';

interface EmptyCalendarStateProps {
  onReset: () => void;
}

export const EmptyCalendarState = ({ onReset }: EmptyCalendarStateProps) => (
  <Box sx={{ display: 'grid', justifyItems: 'center' }}>
    <EmptyState
      title="Nessun evento nel periodo selezionato"
      description="Prova a cambiare i filtri o a spostarti su un altro intervallo temporale."
      actionLabel="Azzera filtri"
      onAction={onReset}
    />
  </Box>
);
