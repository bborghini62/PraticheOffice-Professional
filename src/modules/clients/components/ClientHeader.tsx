import { Box, Typography } from '@mui/material';
import { PrimaryButton, SecondaryButton, SectionCard, StatusBadge } from '../../../design/components';
import type { ClientRecord, ClientStatus, ClientType } from '../clients.types';

interface ClientHeaderProps {
  client: ClientRecord;
  onEdit: () => void;
  onMoreActions: () => void;
}

const clientTypeLabels: Record<ClientType, string> = {
  company: 'Azienda',
  private: 'Privato',
  public_entity: 'Ente pubblico',
  professional: 'Professionista',
  association: 'Associazione',
};

const formatDate = (value: string) => new Date(value).toLocaleDateString('it-IT');

export const ClientHeader = ({ client, onEdit, onMoreActions }: ClientHeaderProps) => {
  const displayName = [client.companyName, `${client.firstName} ${client.lastName}`.trim()].filter(Boolean).join(' ') || client.contactPerson;

  return (
    <SectionCard>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: 'grid', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {client.code}
          </Typography>
          <Typography variant="h5">{displayName}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
            <StatusBadge status={client.status as ClientStatus} />
            <Typography variant="body2" color="text.secondary">
              {clientTypeLabels[client.clientType]}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignSelf: { xs: 'flex-start', md: 'flex-end' } }}>
          <SecondaryButton size="small" sx={{ px: 1.5, py: 0.75 }} onClick={onEdit}>
            Modifica
          </SecondaryButton>
          <PrimaryButton size="small" sx={{ px: 1.5, py: 0.75 }} onClick={onMoreActions}>
            Altre azioni
          </PrimaryButton>
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2, mt: 3 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Referente
          </Typography>
          <Typography variant="subtitle1">{client.contactPerson}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Ultimo aggiornamento
          </Typography>
          <Typography variant="subtitle1">{formatDate(client.updatedAt)}</Typography>
        </Box>
      </Box>
    </SectionCard>
  );
};
