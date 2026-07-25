import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { appRoutes } from '../../core/router/routes';
import { PageContainer, PageTitle, PrimaryButton, SectionCard } from '../../design/components';
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
    <PageContainer>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box>
          <PageTitle subtitle="Gestisci pratiche, stato, priorità e scadenze da una vista unica.">Pratiche</PageTitle>
        </Box>
        <PrimaryButton onClick={handleNewPractice}>Nuova pratica</PrimaryButton>
      </Box>

      <SectionCard>
        <PracticesFilters filters={filters} onFiltersChange={setFilters} onReset={handleResetFilters} />
      </SectionCard>

      {filteredPractices.length > 0 ? (
        <PracticesTable practices={filteredPractices} onOpenPractice={handleOpenPractice} onInformationalAction={handleInformationalAction} />
      ) : (
        <EmptyPracticesState onReset={handleResetFilters} />
      )}
    </PageContainer>
  );
};

export default PracticesPage;
