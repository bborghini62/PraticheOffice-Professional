import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { SectionCard } from '../../../design/components';
import type { PracticeRecord } from '../practices.types';

interface PracticeDetailsTabsProps {
  practice: PracticeRecord;
}

export const PracticeDetailsTabs = ({ practice }: PracticeDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SectionCard>
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ mb: 2 }}>
        <Tab label="Dettagli" />
        <Tab label="Attività" />
        <Tab label="Documenti" />
      </Tabs>

      {activeTab === 0 && (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="body1">{practice.subject}</Typography>
          <Typography variant="body2" color="text.secondary">
            Questa pratica è in fase di gestione operativa. I dettagli principali sono organizzati per rendere più semplice il monitoraggio delle attività e delle scadenze.
          </Typography>
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ display: 'grid', gap: 1 }}>
          <Typography variant="subtitle2">Cronologia operativa</Typography>
          <Typography variant="body2" color="text.secondary">
            • Richiesta ricevuta e assegnata al team responsabile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Verifica documentale in corso
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Aggiornamento previsto entro la scadenza
          </Typography>
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ display: 'grid', gap: 1 }}>
          <Typography variant="subtitle2">Documenti allegati</Typography>
          <Typography variant="body2" color="text.secondary">
            Niente da mostrare ancora. Il caricamento dei documenti sarà disponibile in una prossima iterazione.
          </Typography>
        </Box>
      )}
    </SectionCard>
  );
};
