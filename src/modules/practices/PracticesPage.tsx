import { Box, Button, Paper, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { appRoutes } from '../../core/router/routes';
import { EmptyPracticesState } from './components/EmptyPracticesState';
import { PracticesFilters } from './components/PracticesFilters';
import { PracticesTable } from './components/PracticesTable';
import { filterPractices, getPractices } from './services/practicesService';
import type { PracticeRecord, PracticesFilters as PracticesFilterState } from './practices.types';

const initialFilters: PracticesFilterState = {
  search: '',
  status: 'all',
  priority: 'all',
  clientId: 'all',
};

const PracticesPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [filters, setFilters] = useState<PracticesFilterState>(initialFilters);

  const practices = useMemo(() => getPractices(), []);

  const filteredPractices = useMemo(() => filterPractices(practices, filters.search, filters.status, filters.priority, filters.clientId), [practices, filters]);

  const handleOpenPractice = (practice: PracticeRecord) => {
    navigate(appRoutes.practiceDetail.path.replace(':practiceId', practice.id));
    showNotification({ message: `Hai aperto ${practice.code}`, severity: 'info' });
  };

  const handleInformationalAction = (action: string) => {
    showNotification({ message: `L'azione ${action} sarà disponibile nel prossimo aggiornamento.`, severity: 'info' });
  };

  const handleNewPractice = () => {
    navigate(appRoutes.newPractice.path);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2, mb: 3.5 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Pratiche
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Gestisci pratiche, stato, priorità e scadenze da una vista unica.
          </Typography>
        </Box>
        <Button variant="contained" onClick={handleNewPractice} sx={{ alignSelf: { xs: 'flex-start', md: 'center' } }}>
          Nuova pratica
        </Button>
      </Box>

      <Paper sx={{ p: { xs: 2, md: 2.5 }, mb: 3, borderRadius: 3 }}>
        <PracticesFilters filters={filters} onFiltersChange={setFilters} onReset={handleResetFilters} />
      </Paper>

      {filteredPractices.length > 0 ? (
        <PracticesTable practices={filteredPractices} onOpenPractice={handleOpenPractice} onInformationalAction={handleInformationalAction} />
      ) : (
        <EmptyPracticesState onReset={handleResetFilters} />
      )}
    </Box>
  );
};

export default PracticesPage;
