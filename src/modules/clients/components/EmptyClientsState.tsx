import { Box, Typography } from '@mui/material';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { SecondaryButton } from '../../../design/components';

interface EmptyClientsStateProps {
  onReset: () => void;
}

export const EmptyClientsState = ({ onReset }: EmptyClientsStateProps) => (
  <Box sx={{ textAlign: 'center', py: 6, px: 3, border: '1px dashed', borderColor: 'divider', borderRadius: 3 }}>
    <SearchOffRoundedIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1.5 }} />
    <Typography variant="h6" sx={{ mb: 1 }}>
      Nessun cliente corrisponde ai filtri selezionati.
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Prova a cambiare i parametri di ricerca oppure azzera i filtri per tornare alla lista completa.
    </Typography>
    <SecondaryButton onClick={onReset}>Azzera filtri</SecondaryButton>
  </Box>
);
