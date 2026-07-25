import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { PageContainer, PageTitle, SectionCard } from '../../design/components';
import { getUserById } from './services/usersService';
import { getUserRoleLabel, getUserStatusLabel } from './services/usersService';

const UserDetailPage = () => {
  const { userId } = useParams();
  const user = userId ? getUserById(userId) : null;

  if (!user) {
    return (
      <PageContainer>
        <PageTitle subtitle="Dettaglio utente non disponibile.">Utente</PageTitle>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Box>
        <PageTitle subtitle="Scheda operativa dell’utente selezionato.">Utente</PageTitle>
      </Box>
      <SectionCard>
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{user.displayName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email} · {user.code}
          </Typography>
          <Typography variant="body2">Ruolo: {getUserRoleLabel(user.role)}</Typography>
          <Typography variant="body2">Stato: {getUserStatusLabel(user.status)}</Typography>
          <Typography variant="body2">Reparto: {user.department}</Typography>
          <Typography variant="body2">Gruppo: {user.group}</Typography>
        </Box>
      </SectionCard>
    </PageContainer>
  );
};

export default UserDetailPage;
