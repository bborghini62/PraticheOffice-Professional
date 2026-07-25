import { Stack } from '@mui/material';
import { PrimaryButton, EmptyState } from '../../../design/components';

interface EmptyUsersStateProps {
  onReset: () => void;
}

export const EmptyUsersState = ({ onReset }: EmptyUsersStateProps) => (
  <EmptyState
    title="Nessun utente trovato"
    description="Azzera i filtri per visualizzare l’elenco completo degli utenti dimostrativi."
  >
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
      <PrimaryButton onClick={onReset}>Azzera filtri</PrimaryButton>
    </Stack>
  </EmptyState>
);
