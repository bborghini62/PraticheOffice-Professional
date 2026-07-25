import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getClientDisplayName, getClients } from '../../clients/services/clientsService';
import type { PracticePriority, PracticeStatus, PracticesFilters as PracticesFilterState } from '../practices.types';

interface PracticesFiltersProps {
  filters: PracticesFilterState;
  onFiltersChange: (filters: PracticesFilterState) => void;
  onReset: () => void;
}

const statusOptions: Array<PracticeStatus | 'all'> = ['all', 'draft', 'open', 'in_progress', 'waiting', 'under_review', 'approved', 'completed', 'archived', 'cancelled'];
const priorityOptions: Array<PracticePriority | 'all'> = ['all', 'low', 'normal', 'high', 'urgent'];

const statusLabels: Record<PracticeStatus | 'all', string> = {
  all: 'Tutti',
  draft: 'Bozza',
  open: 'Aperta',
  in_progress: 'In lavorazione',
  waiting: 'In attesa',
  under_review: 'Da controllare',
  approved: 'Approvata',
  completed: 'Completata',
  archived: 'Archiviata',
  cancelled: 'Annullata',
};

const priorityLabels: Record<PracticePriority | 'all', string> = {
  all: 'Tutte',
  low: 'Bassa',
  normal: 'Normale',
  high: 'Alta',
  urgent: 'Urgente',
};

export const PracticesFilters = ({ filters, onFiltersChange, onReset }: PracticesFiltersProps) => {
  const clientOptions = getClients();

  return (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(220px, 1.3fr) minmax(170px, 0.9fr) minmax(170px, 0.9fr) minmax(190px, 0.9fr) auto' }, gap: 1.5, alignItems: 'center' }}>
    <TextField
      label="Ricerca"
      placeholder="Cerca per codice o oggetto"
      value={filters.search}
      onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })}
      size="small"
      fullWidth
    />
    <FormControl size="small" fullWidth>
      <InputLabel id="status-filter-label">Stato</InputLabel>
      <Select
        labelId="status-filter-label"
        label="Stato"
        value={filters.status}
        onChange={(event) => onFiltersChange({ ...filters, status: event.target.value as PracticeStatus | 'all' })}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {statusLabels[option]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl size="small" fullWidth>
      <InputLabel id="priority-filter-label">Priorità</InputLabel>
      <Select
        labelId="priority-filter-label"
        label="Priorità"
        value={filters.priority}
        onChange={(event) => onFiltersChange({ ...filters, priority: event.target.value as PracticePriority | 'all' })}
      >
        {priorityOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {priorityLabels[option]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl size="small" fullWidth>
      <InputLabel id="client-filter-label">Cliente</InputLabel>
      <Select
        labelId="client-filter-label"
        label="Cliente"
        value={filters.clientId}
        onChange={(event) => onFiltersChange({ ...filters, clientId: event.target.value as string | 'all' })}
      >
        <MenuItem value="all">Tutti i clienti</MenuItem>
        {clientOptions.map((client) => (
          <MenuItem key={client.id} value={client.id}>
            {getClientDisplayName(client)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button variant="outlined" onClick={onReset} sx={{ height: 40, justifySelf: { xs: 'start', md: 'stretch' } }}>
      Azzera filtri
    </Button>
  </Box>
  );
};
