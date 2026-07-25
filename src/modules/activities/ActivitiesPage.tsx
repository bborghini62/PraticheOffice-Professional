import { Box, Paper } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageTitle, SectionCard, PrimaryButton } from '../../design/components';
import { useNotification } from '../../core/runtime/useNotification';
import { appRoutes } from '../../core/router/routes';
import { ActivitiesFilters } from './components/ActivitiesFilters';
import { ActivitiesTable } from './components/ActivitiesTable';
import { EmptyActivitiesState } from './components/EmptyActivitiesState';
import { filterActivities, getActivities } from './services/activitiesService';
import type { ActivitiesFilters as ActivitiesFilterState, ActivityRecord } from './activities.types';

const initialFilters: ActivitiesFilterState = {
  search: '',
  status: 'all',
  priority: 'all',
  assignee: 'all',
  practiceId: 'all',
};

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [filters, setFilters] = useState<ActivitiesFilterState>(initialFilters);

  const activities = useMemo(() => getActivities(), []);
  const filteredActivities = useMemo(() => filterActivities(activities, filters.search, filters.status, filters.priority, filters.assignee, filters.practiceId), [activities, filters]);

  const handleOpenActivity = (activity: ActivityRecord) => {
    navigate(appRoutes.practices.path);
    showNotification({ message: `Hai aperto ${activity.code}`, severity: 'info' });
  };

  const handleInformationalAction = (action: string) => {
    showNotification({ message: `L'azione ${action} sarà disponibile nel prossimo aggiornamento.`, severity: 'info' });
  };

  const handleCompleteActivity = (activity: ActivityRecord) => {
    showNotification({ message: `Attività ${activity.code} completata`, severity: 'success' });
  };

  const handleNewActivity = () => {
    navigate('/attivita/nuova');
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box>
          <PageTitle subtitle="Monitora attività, scadenze e assegnazioni in un unico elenco.">Attività</PageTitle>
        </Box>
        <PrimaryButton onClick={handleNewActivity}>
          Nuova attività
        </PrimaryButton>
      </Box>
      <SectionCard>
        <ActivitiesFilters filters={filters} onFiltersChange={setFilters} onReset={handleResetFilters} />
      </SectionCard>
      <Paper sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3 }}>
        {filteredActivities.length > 0 ? (
          <ActivitiesTable activities={filteredActivities} onOpenActivity={handleOpenActivity} onInformationalAction={handleInformationalAction} onCompleteActivity={handleCompleteActivity} />
        ) : (
          <EmptyActivitiesState onReset={handleResetFilters} />
        )}
      </Paper>
    </PageContainer>
  );
};

export default ActivitiesPage;
