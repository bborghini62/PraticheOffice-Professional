import { Box, IconButton, Typography } from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { DataTable } from '../../../design/components';
import { getUserRoleLabel } from '../services/usersService';
import type { UserRecord } from '../users.types';
import { UserStatusBadge } from './UserStatusBadge';

interface UsersTableProps {
  users: UserRecord[];
  onOpenUser: (user: UserRecord) => void;
  onInformationalAction: (action: string) => void;
}

export const UsersTable = ({ users, onOpenUser, onInformationalAction }: UsersTableProps) => {
  const columns = ['Codice', 'Nome e cognome', 'Email', 'Ruolo', 'Gruppo', 'Reparto', 'Stato', 'Ultimo accesso', 'Azioni'];

  return (
    <DataTable columns={columns}>
      {users.map((user) => (
        <tr key={user.id} style={{ cursor: 'pointer' }} onClick={() => onOpenUser(user)}>
          <td style={{ padding: '16px' }}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {user.code}
            </Typography>
          </td>
          <td style={{ padding: '16px' }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {user.displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.firstName} {user.lastName}
            </Typography>
          </td>
          <td style={{ padding: '16px' }}>
            <Typography variant="body2">{user.email}</Typography>
          </td>
          <td style={{ padding: '16px' }}>
            <Typography variant="body2">{getUserRoleLabel(user.role)}</Typography>
          </td>
          <td style={{ padding: '16px' }}>
            <Typography variant="body2">{user.group}</Typography>
          </td>
          <td style={{ padding: '16px' }}>
            <Typography variant="body2">{user.department}</Typography>
          </td>
          <td style={{ padding: '16px' }}>
            <UserStatusBadge status={user.status} />
          </td>
          <td style={{ padding: '16px' }}>
            <Typography variant="body2">{new Date(user.lastAccessAt).toLocaleString('it-IT')}</Typography>
          </td>
          <td style={{ padding: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Typography
                component="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenUser(user);
                }}
                sx={{ cursor: 'pointer', color: 'primary.main', border: 'none', background: 'transparent', p: 0, fontWeight: 600 }}
              >
                Apri
              </Typography>
              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  onInformationalAction('Modifica');
                }}
              >
                <Typography variant="caption">Mod</Typography>
              </IconButton>
              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  onInformationalAction('Sospendi/Riattiva');
                }}
              >
                <MoreVertRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};
