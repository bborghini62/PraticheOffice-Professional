import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/useAuth';
import { appRoutes } from '../../core/router/routes';
import { PageContainer, PageTitle, PrimaryButton, SecondaryButton } from '../../design/components';
import { getUsers } from '../users/services/usersService';
import { DashboardKpiCard } from './components/DashboardKpiCard';
import { DashboardSection } from './components/DashboardSection';
import { OpenActivities } from './components/OpenActivities';
import { RecentPractices } from './components/RecentPractices';
import { RecentTimelineEvents } from './components/RecentTimelineEvents';
import { UpcomingDeadlines } from './components/UpcomingDeadlines';
import { WorkloadByUser } from './components/WorkloadByUser';
import { getActiveGroups } from '../groups/services/groupsService';
import { useDashboardData } from './services/dashboardService';
import type { DashboardFilters } from './dashboard.types';

const initialFilters: DashboardFilters = {
  period: '7days',
  responsible: 'all',
  group: 'all',
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filters, setFilters] = useState<DashboardFilters>(initialFilters);
  const users = useMemo(() => getUsers(), []);
  const groups = useMemo(() => getActiveGroups(), []);
  const dashboardUser: { role: 'Administrator' | 'Operator'; displayName: string; group: string } | null = user
    ? { role: user.role === 'Amministratore' ? 'Administrator' : 'Operator', displayName: user.name, group: '' }
    : null;
  const { kpis, deadlines, openActivities, recentPractices, timelineEvents, workload } = useDashboardData(filters, dashboardUser);

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box>
          <PageTitle subtitle="Panoramica operativa di PraticheOffice Professional">Dashboard</PageTitle>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <SecondaryButton onClick={() => navigate(appRoutes.practices.path)}>Apri pratiche</SecondaryButton>
          <PrimaryButton onClick={() => navigate(appRoutes.activities.path)}>Apri attività</PrimaryButton>
        </Box>
      </Box>

      <DashboardSection title="Filtri dashboard" description="Seleziona intervallo temporale e contesto di visibilità.">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="dashboard-period-label">Intervallo</InputLabel>
            <Select labelId="dashboard-period-label" label="Intervallo" value={filters.period} onChange={(event) => setFilters((current) => ({ ...current, period: event.target.value as DashboardFilters['period'] }))}>
              <MenuItem value="today">Oggi</MenuItem>
              <MenuItem value="7days">7 giorni</MenuItem>
              <MenuItem value="30days">30 giorni</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel id="dashboard-responsible-label">Responsabile</InputLabel>
            <Select labelId="dashboard-responsible-label" label="Responsabile" value={filters.responsible} onChange={(event) => setFilters((current) => ({ ...current, responsible: event.target.value as DashboardFilters['responsible'] }))}>
              <MenuItem value="all">Tutti</MenuItem>
              {users.map((candidate) => (
                <MenuItem key={candidate.id} value={candidate.displayName}>{candidate.displayName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel id="dashboard-group-label">Gruppo</InputLabel>
            <Select labelId="dashboard-group-label" label="Gruppo" value={filters.group} onChange={(event) => setFilters((current) => ({ ...current, group: event.target.value as DashboardFilters['group'] }))}>
              <MenuItem value="all">Tutti</MenuItem>
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.name}>{group.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DashboardSection>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' } }}>
        {kpis.map((kpi) => (
          <DashboardKpiCard key={kpi.id} kpi={kpi} />
        ))}
      </Box>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', lg: '1.2fr 0.8fr' } }}>
        <UpcomingDeadlines items={deadlines} />
        <OpenActivities items={openActivities} />
      </Box>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
        <RecentPractices items={recentPractices} />
        <RecentTimelineEvents items={timelineEvents} />
      </Box>

      <WorkloadByUser items={workload} />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Dati filtrati secondo il ruolo attivo e il contesto operativo selezionato.
      </Typography>
    </PageContainer>
  );
};

export default DashboardPage;
