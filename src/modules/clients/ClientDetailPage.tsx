import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState, PageContainer, PageTitle, PrimaryButton, SecondaryButton, SectionCard } from '../../design/components';
import { useNotification } from '../../core/runtime/useNotification';
import { appRoutes } from '../../core/router/routes';
import { ClientDetailsTabs } from './components/ClientDetailsTabs';
import { ClientHeader } from './components/ClientHeader';
import { deleteClient, getClientById, getClientDisplayName } from './services/clientsService';

export const ClientDetailPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [clientMenuAnchor, setClientMenuAnchor] = useState<null | HTMLElement>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [, forceRefresh] = useState(0);

  useEffect(() => {
    const refreshClient = () => forceRefresh((current) => current + 1);

    window.addEventListener('praticheoffice:data-changed', refreshClient);
    window.addEventListener('storage', refreshClient);

    return () => {
      window.removeEventListener('praticheoffice:data-changed', refreshClient);
      window.removeEventListener('storage', refreshClient);
    };
  }, []);

  const client = clientId ? getClientById(clientId) : undefined;

  if (!client) {
    return (
      <PageContainer>
        <EmptyState title="Cliente non trovato" description="L’anagrafica richiesta non è disponibile o è stata rimossa dall’elenco corrente." actionLabel="Torna ai clienti" onAction={() => navigate('/clienti')} />
      </PageContainer>
    );
  }

  const displayName = getClientDisplayName(client);

  const handleEditClient = () => {
    navigate(appRoutes.clientEdit.path.replace(':clientId', client.id));
  };

  const handleDeleteClient = async () => {
    try {
      await deleteClient(client.id);
      setIsDeleteConfirmOpen(false);
      setClientMenuAnchor(null);
      showNotification({ message: 'Cliente eliminato correttamente.', severity: 'success' });
      navigate(appRoutes.clients.path);
    } catch (error) {
      showNotification({ message: error instanceof Error ? error.message : 'Impossibile eliminare il cliente.', severity: 'error' });
    }
  };

  return (
    <PageContainer>
      <PageTitle subtitle={`${client.code} • ${displayName}`}>Scheda cliente</PageTitle>
      <ClientHeader client={client} onEdit={handleEditClient} onMoreActions={(event) => setClientMenuAnchor(event.currentTarget)} />
      <Menu anchorEl={clientMenuAnchor} open={Boolean(clientMenuAnchor)} onClose={() => setClientMenuAnchor(null)}>
        <MenuItem onClick={() => { setClientMenuAnchor(null); handleEditClient(); }}>Modifica cliente</MenuItem>
        <MenuItem onClick={() => { setClientMenuAnchor(null); setIsDeleteConfirmOpen(true); }}>Elimina cliente</MenuItem>
      </Menu>
      <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Elimina cliente</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Confermi l'eliminazione di {displayName}? L'anagrafica verrà rimossa anche dal cloud.</Typography>
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={() => setIsDeleteConfirmOpen(false)}>Annulla</SecondaryButton>
          <PrimaryButton onClick={handleDeleteClient}>Conferma</PrimaryButton>
        </DialogActions>
      </Dialog>
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
