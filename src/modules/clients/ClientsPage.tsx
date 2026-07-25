import { Box, Paper, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { appRoutes } from '../../core/router/routes';
import { PageContainer, PageTitle, PrimaryButton } from '../../design/components';
import { ClientsFilters } from './components/ClientsFilters';
import { ClientsTable } from './components/ClientsTable';
import { EmptyClientsState } from './components/EmptyClientsState';
import { filterClients, getClients } from './services/clientsService';
import type { ClientRecord, ClientsFilters as ClientsFilterState } from './clients.types';

const initialFilters: ClientsFilterState = {
  search: '',
  type: 'all',
  status: 'all',
};

const ClientsPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [filters, setFilters] = useState<ClientsFilterState>(initialFilters);

  const clients = useMemo(() => getClients(), []);
  const filteredClients = useMemo(() => filterClients(clients, filters.search, filters.type, filters.status), [clients, filters]);

  const handleOpenClient = (client: ClientRecord) => {
    navigate(appRoutes.clientDetail.path.replace(':clientId', client.id));
    showNotification({ message: `Hai aperto ${client.code}`, severity: 'info' });
  };

  const handleInformationalAction = (action: string) => {
    showNotification({ message: `L'azione ${action} sarà disponibile nel prossimo aggiornamento.`, severity: 'info' });
  };

  const handleNewClient = () => {
    navigate(appRoutes.newClient.path);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box>
          <PageTitle>Clienti</PageTitle>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Gestione delle anagrafiche clienti.
          </Typography>
        </Box>
        <PrimaryButton onClick={handleNewClient}>Nuovo cliente</PrimaryButton>
      </Box>

      <Paper sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3 }}>
        <ClientsFilters filters={filters} onFiltersChange={setFilters} onReset={handleResetFilters} />
      </Paper>

      {filteredClients.length > 0 ? (
        <ClientsTable clients={filteredClients} onOpenClient={handleOpenClient} onInformationalAction={handleInformationalAction} />
      ) : (
        <EmptyClientsState onReset={handleResetFilters} />
      )}
    </PageContainer>
  );
};

export default ClientsPage;
