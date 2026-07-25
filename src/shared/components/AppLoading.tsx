// Shared loading UI shown while lazy-loaded routes are resolving.

import { Box, CircularProgress, Typography } from '@mui/material';

export const AppLoading = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
    <CircularProgress />
    <Typography variant="body1">Caricamento in corso…</Typography>
  </Box>
);
