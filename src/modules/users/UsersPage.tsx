import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../core/router/routes';
import { useNotification } from '../../core/runtime/useNotification';
import { PageContainer, PageTitle, PrimaryButton, SectionCard } from '../../design/components';
import { AccessDeniedState } from './components/AccessDeniedState';
import { EmptyUsersState } from './components/EmptyUsersState';
import { UsersFilters } from './components/UsersFilters';
import { UsersTable } from './components/UsersTable';
import { filterUsers, getUsers } from './services/usersService';
import type { UserRecord, UsersFilters as UsersFilterState } from './users.types';
import { useAuth } from '../auth/context/useAuth';

const initialFilters: UsersFilterState = {
  search: '',
  role: 'all',
  status: 'all',
  group: 'all',
  department: 'all',
};

const UsersPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const [filters, setFilters] = useState<UsersFilterState>(initialFilters);

  const users = useMemo(() => getUsers(), []);
  const filteredUsers = useMemo(() => filterUsers(users, filters), [users, filters]);

  const handleOpenUser = (selectedUser: UserRecord) => {
    showNotification({ message: `Dettaglio di ${selectedUser.displayName} in fase di sviluppo.`, severity: 'info' });
  };

  const handleInformationalAction = (action: string) => {
    showNotification({ message: `L'azione ${action} sarà disponibile nel prossimo aggiornamento.`, severity: 'info' });
  };

  const handleNewUser = () => {
    navigate(appRoutes.newUser.path);
    showNotification({ message: 'Compilazione del modulo di creazione utente.', severity: 'info' });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  if (user?.role !== 'Amministratore') {
    return (
      <PageContainer>
        <Box>
          <PageTitle subtitle="Gestione utenti e accessi operativi.">Utenti</PageTitle>
        </Box>
        <AccessDeniedState />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box>
          <PageTitle subtitle="Gestione utenti, ruoli e stati di accesso.">Utenti</PageTitle>
        </Box>
        <PrimaryButton onClick={handleNewUser}>Nuovo utente</PrimaryButton>
      </Box>

      <SectionCard>
        <UsersFilters filters={filters} onFiltersChange={setFilters} onReset={handleResetFilters} />
      </SectionCard>

      {filteredUsers.length > 0 ? (
        <UsersTable users={filteredUsers} onOpenUser={handleOpenUser} onInformationalAction={handleInformationalAction} />
      ) : (
        <EmptyUsersState onReset={handleResetFilters} />
      )}
    </PageContainer>
  );
};

export default UsersPage;
