import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SearchBox } from '../../../design/components';
import { SecondaryButton } from '../../../design/components';
import type { ClientStatus, ClientType, ClientsFilters as ClientsFilterState } from '../clients.types';

interface ClientsFiltersProps {
  filters: ClientsFilterState;
  onFiltersChange: (filters: ClientsFilterState) => void;
  onReset: () => void;
}

const clientTypeOptions: Array<{ value: ClientType | 'all'; label: string }> = [
  { value: 'all', label: 'Tutti' },
  { value: 'company', label: 'Azienda' },
  { value: 'private', label: 'Privato' },
  { value: 'public_entity', label: 'Ente pubblico' },
  { value: 'professional', label: 'Professionista' },
  { value: 'association', label: 'Associazione' },
];

const statusOptions: Array<{ value: ClientStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Tutti' },
  { value: 'active', label: 'Attivo' },
  { value: 'inactive', label: 'Inattivo' },
  { value: 'archived', label: 'Archiviato' },
];

export const ClientsFilters = ({ filters, onFiltersChange, onReset }: ClientsFiltersProps) => (
  <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr auto' }, alignItems: 'center' }}>
    <SearchBox
      label="Cerca cliente"
      value={filters.search}
      onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })}
      placeholder="Codice, nome, referente, città"
    />
    <FormControl size="small">
      <InputLabel id="client-type-filter-label">Tipo cliente</InputLabel>
      <Select
        labelId="client-type-filter-label"
        label="Tipo cliente"
        value={filters.type}
        onChange={(event) => onFiltersChange({ ...filters, type: event.target.value as ClientType | 'all' })}
      >
        {clientTypeOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl size="small">
      <InputLabel id="client-status-filter-label">Stato</InputLabel>
      <Select
        labelId="client-status-filter-label"
        label="Stato"
        value={filters.status}
        onChange={(event) => onFiltersChange({ ...filters, status: event.target.value as ClientStatus | 'all' })}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <SecondaryButton onClick={onReset}>Azzera filtri</SecondaryButton>
  </Box>
);
