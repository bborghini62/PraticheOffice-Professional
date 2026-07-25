import { Box, Divider, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState, PageContainer, PageTitle, SectionCard } from '../../design/components';
import { ClientDetailsTabs } from './components/ClientDetailsTabs';
import { ClientHeader } from './components/ClientHeader';
import { getClientById, getClientDisplayName } from './services/clientsService';

export const ClientDetailPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();

  const client = useMemo(() => (clientId ? getClientById(clientId) : undefined), [clientId]);

  if (!client) {
    return (
      <PageContainer>
        <EmptyState title="Cliente non trovato" description="L’anagrafica richiesta non è disponibile o è stata rimossa dall’elenco corrente." actionLabel="Torna ai clienti" onAction={() => navigate('/clienti')} />
      </PageContainer>
    );
  }

  const displayName = getClientDisplayName(client);

  return (
    <PageContainer>
      <PageTitle subtitle={`${client.code} • ${displayName}`}>Scheda cliente</PageTitle>
      <ClientHeader client={client} onEdit={() => navigate('/clienti')} onMoreActions={() => navigate('/clienti')} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ClientDetailsTabs client={client} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Dati operativi
            </Typography>
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  Gruppo / Area
                </Typography>
                <Typography variant="subtitle1">Amministrazione</Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  Recapiti
                </Typography>
                <Typography variant="subtitle1">{client.phone || client.mobile}</Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  Dati fiscali
                </Typography>
                <Typography variant="subtitle1">{client.vatNumber || client.fiscalCode}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Indirizzo
                </Typography>
                <Typography variant="subtitle1">{`${client.address}, ${client.postalCode} ${client.city}`}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Stato
                </Typography>
                <Typography variant="subtitle1">{client.status === 'active' ? 'Attivo' : client.status === 'inactive' ? 'Inattivo' : 'Archiviato'}</Typography>
              </Box>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ClientDetailPage;
