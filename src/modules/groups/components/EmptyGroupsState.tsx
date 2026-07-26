import { Box, Typography } from '@mui/material';
import { PrimaryButton } from '../../../design/components';

interface EmptyGroupsStateProps {
  onCreate: () => void;
}

export const EmptyGroupsState = ({ onCreate }: EmptyGroupsStateProps) => (
  <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 4, textAlign: 'center' }}>
    <Typography variant="h6" sx={{ mb: 1 }}>
      Nessun gruppo configurato
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Inizia creando il primo gruppo operativo per riempire il catalogo condiviso.
    </Typography>
    <PrimaryButton onClick={onCreate}>Nuovo gruppo</PrimaryButton>
  </Box>
);
