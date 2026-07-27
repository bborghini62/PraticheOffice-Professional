import { Alert, Box, Chip } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../core/runtime/useNotification';
import { appRoutes } from '../../core/router/routes';
import { PageContainer, PageTitle, PrimaryButton, SectionCard } from '../../design/components';
import { ClientsFilters } from './components/ClientsFilters';
import { ClientsTable } from './components/ClientsTable';
import { EmptyClientsState } from './components/EmptyClientsState';
import { bootstrapClientsCloudSync, filterClients, getClients, getClientsSyncState, subscribeClientsSyncState } from './services/clientsService';
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
  const [clients, setClients] = useState<ClientRecord[]>(() => getClients());
  const [syncState, setSyncState] = useState(() => getClientsSyncState());

  useEffect(() => {
    const refreshClients = () => setClients(getClients());
    const refreshSyncState = () => setSyncState(getClientsSyncState());

    refreshClients();
    refreshSyncState();
    void bootstrapClientsCloudSync();

    window.addEventListener('praticheoffice:data-changed', refreshClients);
    window.addEventListener('storage', refreshClients);
    window.addEventListener('praticheoffice:clients-sync-state-changed', refreshSyncState);
    const unsubscribe = subscribeClientsSyncState(refreshSyncState);

    return () => {
      window.removeEventListener('praticheoffice:data-changed', refreshClients);
      window.removeEventListener('storage', refreshClients);
      window.removeEventListener('praticheoffice:clients-sync-state-changed', refreshSyncState);
      unsubscribe();
    };
  }, []);

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
          <PageTitle subtitle="Gestione delle anagrafiche clienti e dei riferimenti operativi.">Clienti</PageTitle>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
          <Chip
            label={syncState.status === 'syncing' ? 'Sincronizzazione in corso' : syncState.status === 'synced' ? 'Dati sincronizzati' : syncState.status === 'offline' ? 'Modalità offline' : syncState.status === 'error' ? 'Errore sincronizzazione' : 'Cache locale'}
            color={syncState.status === 'synced' ? 'success' : syncState.status === 'syncing' ? 'warning' : syncState.status === 'error' ? 'error' : 'default'}
            variant={syncState.status === 'idle' ? 'outlined' : 'filled'}
          />
          <PrimaryButton onClick={handleNewClient}>Nuovo cliente</PrimaryButton>
        </Box>
      </Box>

      <SectionCard>
        <ClientsFilters filters={filters} onFiltersChange={setFilters} onReset={handleResetFilters} />
      </SectionCard>

      {filteredClients.length > 0 ? (
        <ClientsTable clients={filteredClients} onOpenClient={handleOpenClient} onInformationalAction={handleInformationalAction} />
      ) : (
        <EmptyClientsState onReset={handleResetFilters} />
      )}

      {syncState.status === 'error' ? <Alert severity="error" sx={{ mt: 2 }}>{syncState.message}</Alert> : null}
    </PageContainer>
  );
};

export default ClientsPage;
