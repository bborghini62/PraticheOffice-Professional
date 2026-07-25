import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useMemo, useState, type MouseEvent } from 'react';
import { DataTable, StatusBadge } from '../../../design/components';
import type { ClientRecord, ClientType } from '../clients.types';

interface ClientsTableProps {
  clients: ClientRecord[];
  onOpenClient: (client: ClientRecord) => void;
  onInformationalAction: (action: string) => void;
}

const clientTypeLabels: Record<ClientType, string> = {
  company: 'Azienda',
  private: 'Privato',
  public_entity: 'Ente pubblico',
  professional: 'Professionista',
  association: 'Associazione',
};

export const ClientsTable = ({ clients, onOpenClient, onInformationalAction }: ClientsTableProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);

  const sortedClients = useMemo(() => [...clients].sort((left, right) => left.companyName.localeCompare(right.companyName)), [clients]);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, client: ClientRecord) => {
    event.stopPropagation();
    setSelectedClient(client);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClient(null);
  };

  const handleAction = (action: string) => {
    if (selectedClient) {
      onInformationalAction(action);
    }
    handleMenuClose();
  };

  return (
    <Box>
      <DataTable columns={['Codice', 'Ragione sociale / Nome', 'Tipo', 'CF / P.IVA', 'Referente', 'Email', 'Telefono', 'Stato', 'Azioni']}>
        {sortedClients.map((client) => {
          const displayName = [client.companyName, `${client.firstName} ${client.lastName}`.trim()].filter(Boolean).join(' ') || client.contactPerson;

          return (
            <tr key={client.id} style={{ cursor: 'pointer' }} onClick={() => onOpenClient(client)}>
              <td style={{ padding: '16px 16px 16px 16px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {client.code}
                </Typography>
              </td>
              <td style={{ padding: '16px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {displayName}
                </Typography>
              </td>
              <td style={{ padding: '16px' }}>{clientTypeLabels[client.clientType]}</td>
              <td style={{ padding: '16px' }}>{client.vatNumber || client.fiscalCode}</td>
              <td style={{ padding: '16px' }}>{client.contactPerson}</td>
              <td style={{ padding: '16px' }}>{client.email}</td>
              <td style={{ padding: '16px' }}>{client.phone || client.mobile}</td>
              <td style={{ padding: '16px' }}>
                <StatusBadge status={client.status} />
              </td>
              <td style={{ padding: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Typography
                    component="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpenClient(client);
                    }}
                    sx={{ cursor: 'pointer', color: 'primary.main', border: 'none', background: 'transparent', p: 0, fontWeight: 600 }}
                  >
                    Apri
                  </Typography>
                  <IconButton size="small" onClick={(event) => handleMenuOpen(event, client)}>
                    <MoreVertRoundedIcon />
                  </IconButton>
                </Box>
              </td>
            </tr>
          );
        })}
      </DataTable>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleAction('modifica')}>Modifica</MenuItem>
        <MenuItem onClick={() => handleAction('duplica')}>Duplica</MenuItem>
        <MenuItem onClick={() => handleAction('archivia')}>Archivia</MenuItem>
      </Menu>
    </Box>
  );
};
