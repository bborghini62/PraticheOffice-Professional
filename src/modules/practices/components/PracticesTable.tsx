import { Box, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useMemo, useState } from 'react';
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    onInformationalAction(action);
    handleMenuClose();
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 960 }}>
          <TableHead>
            <TableRow>
              <TableCell>Codice</TableCell>
              <TableCell>Oggetto</TableCell>
              <TableCell>Stato</TableCell>
              <TableCell>Priorità</TableCell>
              <TableCell>Responsabile</TableCell>
              <TableCell>Gruppo</TableCell>
              <TableCell>Scadenza</TableCell>
              <TableCell>Ultimo aggiornamento</TableCell>
              <TableCell align="right">Azioni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPractices.map((practice) => (
              <TableRow key={practice.id} hover>
                <TableCell>{practice.code}</TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {practice.subject}
                  </Typography>
                </TableCell>
                <TableCell>
                  <PracticeStatusChip status={practice.status as PracticeStatus} />
                </TableCell>
                <TableCell>{priorityLabels[practice.priority as PracticePriority]}</TableCell>
                <TableCell>{practice.responsible}</TableCell>
                <TableCell>{practice.group}</TableCell>
                <TableCell>{formatDate(practice.dueDate)}</TableCell>
                <TableCell>{formatDate(practice.updatedAt)}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Typography component="button" onClick={() => onOpenPractice(practice)} sx={{ cursor: 'pointer', color: 'primary.main', border: 'none', background: 'transparent', p: 0 }}>
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
