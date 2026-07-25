import { Alert, Stack, Typography } from '@mui/material';
import { SectionCard } from '../../../design/components';

export const AccessDeniedState = () => (
  <SectionCard>
    <Stack spacing={1.5}>
      <Alert severity="warning">Accesso non consentito</Alert>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Questa sezione è riservata agli amministratori dell’area operativa.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Se hai bisogno di gestire gli utenti, richiedi il supporto di un amministratore del sistema.
      </Typography>
    </Stack>
  </SectionCard>
);
