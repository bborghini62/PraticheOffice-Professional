import { Box, MenuItem, TextField } from '@mui/material';
import { SecondaryButton } from '../../../design/components';
import type { UsersFilters as UsersFilterState } from '../users.types';

interface UsersFiltersProps {
  filters: UsersFilterState;
  onFiltersChange: (filters: UsersFilterState) => void;
  onReset: () => void;
}

const roleOptions = [
  { value: 'all', label: 'Tutti i ruoli' },
  { value: 'Administrator', label: 'Amministratore' },
  { value: 'Supervisor', label: 'Supervisore' },
  { value: 'Operator', label: 'Operatore' },
  { value: 'Collaborator', label: 'Collaboratore' },
  { value: 'Viewer', label: 'Visualizzatore' },
];

const statusOptions = [
  { value: 'all', label: 'Tutti gli stati' },
  { value: 'Active', label: 'Attivo' },
  { value: 'Suspended', label: 'Sospeso' },
  { value: 'Disabled', label: 'Disabilitato' },
];

const groupOptions = [
  { value: 'all', label: 'Tutti i gruppi' },
  { value: 'Executive', label: 'Executive' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Reporting', label: 'Reporting' },
  { value: 'Client Services', label: 'Client Services' },
  { value: 'Admin Support', label: 'Admin Support' },
  { value: 'Case Management', label: 'Case Management' },
];

const departmentOptions = [
  { value: 'all', label: 'Tutti i reparti' },
  { value: 'Amministrazione', label: 'Amministrazione' },
  { value: 'Operativo', label: 'Operativo' },
  { value: 'Legale', label: 'Legale' },
  { value: 'Controllo', label: 'Controllo' },
  { value: 'Clienti', label: 'Clienti' },
  { value: 'Pratiche', label: 'Pratiche' },
];

export const UsersFilters = ({ filters, onFiltersChange, onReset }: UsersFiltersProps) => (
  <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(5, minmax(0, 1fr))' } }}>
    <TextField
      label="Ricerca"
      value={filters.search}
      onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })}
      fullWidth
    />
    <TextField select label="Ruolo" value={filters.role} onChange={(event) => onFiltersChange({ ...filters, role: event.target.value })} fullWidth>
      {roleOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    <TextField select label="Stato" value={filters.status} onChange={(event) => onFiltersChange({ ...filters, status: event.target.value })} fullWidth>
      {statusOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    <TextField select label="Gruppo" value={filters.group} onChange={(event) => onFiltersChange({ ...filters, group: event.target.value })} fullWidth>
      {groupOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    <TextField select label="Reparto" value={filters.department} onChange={(event) => onFiltersChange({ ...filters, department: event.target.value })} fullWidth>
      {departmentOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    <Box sx={{ gridColumn: { md: 'span 5' }, display: 'flex', justifyContent: 'flex-end' }}>
      <SecondaryButton onClick={onReset}>Azzera filtri</SecondaryButton>
    </Box>
  </Box>
);
