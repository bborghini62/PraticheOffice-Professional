import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appRoutes } from '../../core/router/routes';
import { useNotification } from '../../core/runtime/useNotification';
import { LoginForm } from './components/LoginForm';
import { useAuth } from './context/useAuth';
import type { LoginCredentials } from './auth.types';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (credentials: LoginCredentials) => {
    setIsSubmitting(true);
    setErrorMessage(undefined);

    try {
      await login(credentials);
      const from = location.state?.from?.pathname ?? appRoutes.dashboard.path;
      navigate(from, { replace: true });
      showNotification({ message: 'Accesso eseguito correttamente.', severity: 'success' });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Accesso non riuscito.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Box sx={{ display: { xs: 'block', md: 'grid' }, gridTemplateColumns: { md: '1.1fr 0.9fr' } }}>
            <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: 'primary.main', color: 'white' }}>
              <Stack spacing={2}>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  PraticheOffice Professional
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, opacity: 0.95 }}>
                  Il portale operativo per gestire pratiche, clienti, attività e documenti con un’esperienza semplice e professionale.
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Accesso demo: amministratore@praticheoffice.local / Admin123! oppure operatore@praticheoffice.local / Operatore123!.
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} errorMessage={errorMessage} />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
