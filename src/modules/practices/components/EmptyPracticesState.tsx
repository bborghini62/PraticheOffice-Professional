import { Box, Button, Typography } from '@mui/material';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';

interface EmptyPracticesStateProps {
  onReset: () => void;
}

export const EmptyPracticesState = ({ onReset }: EmptyPracticesStateProps) => (
  <Box sx={{ textAlign: 'center', py: 6, px: 3, border: '1px dashed', borderColor: 'divider', borderRadius: 3 }}>
    <SearchOffRoundedIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1.5 }} />
    <Typography variant="h6" sx={{ mb: 1 }}>
      Nessuna pratica corrisponde ai filtri selezionati.
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Prova a cambiare i parametri di ricerca oppure azzera i filtri per tornare alla lista completa.
    </Typography>
    <Button variant="outlined" onClick={onReset}>
      Azzera filtri
    </Button>
  </Box>
);
