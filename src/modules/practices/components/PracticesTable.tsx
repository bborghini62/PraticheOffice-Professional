import { Box, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useMemo, useState, type MouseEvent } from 'react';
import { getPracticeClientDisplayName } from '../services/practicesService';
import { PracticeStatusChip } from './PracticeStatusChip';
import type { PracticeRecord, PracticePriority, PracticeStatus } from '../practices.types';

interface PracticesTableProps {
  practices: PracticeRecord[];
  onOpenPractice: (practice: PracticeRecord) => void;
  onInformationalAction: (action: string) => void;
}

const priorityLabels: Record<PracticePriority, string> = {
  low: 'Bassa',
  normal: 'Normale',
  high: 'Alta',
  urgent: 'Urgente',
};

const formatDate = (value: string) => new Date(value).toLocaleDateString('it-IT');

export const PracticesTable = ({ practices, onOpenPractice, onInformationalAction }: PracticesTableProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const menuOpen = Boolean(anchorEl);

  const sortedPractices = useMemo(() => [...practices].sort((left, right) => left.subject.localeCompare(right.subject)), [practices]);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    onInformationalAction(action);
    handleMenuClose();
  };

  const handleRowClick = (practice: PracticeRecord) => {
    onOpenPractice(practice);
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ overflowX: 'auto', borderRadius: 3 }}>
        <Table sx={{ minWidth: 960 }}>
          <TableHead>
            <TableRow>
              <TableCell>Codice</TableCell>
              <TableCell>Oggetto</TableCell>
              <TableCell>Stato</TableCell>
              <TableCell>Priorità</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Responsabile</TableCell>
              <TableCell>Gruppo</TableCell>
              <TableCell>Scadenza</TableCell>
              <TableCell>Ultimo aggiornamento</TableCell>
              <TableCell align="right">Azioni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPractices.map((practice) => (
              <TableRow
                key={practice.id}
                hover
                onClick={() => handleRowClick(practice)}
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'grey.50' }, height: 64 }}
              >
                <TableCell sx={{ py: 1.4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {practice.code}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1.4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                      {practice.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Verifica e aggiornamento operativo
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 1.4 }}>
                  <PracticeStatusChip status={practice.status as PracticeStatus} />
                </TableCell>
                <TableCell sx={{ py: 1.4 }}>{priorityLabels[practice.priority as PracticePriority]}</TableCell>
                <TableCell sx={{ py: 1.4 }}>{getPracticeClientDisplayName(practice)}</TableCell>
                <TableCell sx={{ py: 1.4 }}>{practice.responsible}</TableCell>
                <TableCell sx={{ py: 1.4 }}>{practice.group}</TableCell>
                <TableCell sx={{ py: 1.4 }}>{formatDate(practice.dueDate)}</TableCell>
                <TableCell sx={{ py: 1.4 }}>{formatDate(practice.updatedAt)}</TableCell>
                <TableCell align="right" sx={{ py: 1.4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Typography
                      component="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenPractice(practice);
                      }}
                      sx={{ cursor: 'pointer', color: 'primary.main', border: 'none', background: 'transparent', p: 0, fontWeight: 600 }}
                    >
                      Apri
                    </Typography>
                    <IconButton size="small" onClick={(event) => handleMenuOpen(event)}>
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleAction('modifica')}>Modifica</MenuItem>
        <MenuItem onClick={() => handleAction('duplica')}>Duplica</MenuItem>
        <MenuItem onClick={() => handleAction('archivia')}>Archivia</MenuItem>
      </Menu>
    </Box>
  );
};
