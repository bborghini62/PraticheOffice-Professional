import { Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../core/router/routes';
import { useNotification } from '../../core/runtime/useNotification';
import { PageContainer, PageTitle } from '../../design/components';
import { AccessDeniedState } from './components/AccessDeniedState';
import { UserForm } from './components/UserForm';
import { createUser } from './services/usersService';
import type { NewUserPayload } from './users.types';
import { useAuth } from '../auth/context/useAuth';

const NewUserPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (payload: NewUserPayload) => {
    setIsSubmitting(true);
    setErrorMessage(undefined);

    if (payload.password !== payload.confirmPassword) {
      setErrorMessage('Le password non coincidono.');
      setIsSubmitting(false);
      return;
    }

    try {
      createUser({
        ...payload,
        password: payload.password,
        isDemoUser: true,
      });

      showNotification({ message: 'Utente creato correttamente', severity: 'success' });
      navigate(appRoutes.users.path);
    } catch {
      setErrorMessage('Impossibile creare l’utente richiesto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user?.role !== 'Amministratore') {
    return (
      <PageContainer>
        <Box>
          <PageTitle subtitle="Aggiungi un nuovo utente di sistema.">Nuovo utente</PageTitle>
        </Box>
        <AccessDeniedState />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Box>
        <PageTitle subtitle="Aggiungi un nuovo utente di sistema.">Nuovo utente</PageTitle>
      </Box>
      <UserForm onSubmit={handleSubmit} isSubmitting={isSubmitting} errorMessage={errorMessage} />
    </PageContainer>
  );
};

export default NewUserPage;
