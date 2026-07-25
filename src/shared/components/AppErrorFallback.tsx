// Shared error fallback shown when the application encounters a rendering failure.

import { Box, Button, Typography } from '@mui/material';
import { appConfig } from '../../core/config';

interface AppErrorFallbackProps {
  error?: Error;
  onReload?: () => void;
}

export const AppErrorFallback = ({ error, onReload }: AppErrorFallbackProps) => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
    <Box sx={{ maxWidth: 560, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Si è verificato un problema nell’applicazione.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        L’applicazione non può essere caricata correttamente. È possibile riprovare.
      </Typography>
      {appConfig.isDevelopment && error ? (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          {error.message}
        </Typography>
      ) : null}
      <Button variant="contained" onClick={onReload}>
        Ricarica applicazione
      </Button>
    </Box>
  </Box>
);
