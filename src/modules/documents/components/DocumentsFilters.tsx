import { Box, MenuItem, Select, Typography } from '@mui/material';
import { PrimaryButton, SearchBox, SecondaryButton } from '../../../design/components';
import { getPractices } from '../../practices/services/practicesService';
import type { DocumentCategory, DocumentStatus, DocumentsFilters as DocumentsFilterState } from '../documents.types';

interface DocumentsFiltersProps {
  filters: DocumentsFilterState;
  onFiltersChange: (next: DocumentsFilterState) => void;
  onReset: () => void;
}

const statusOptions: Array<{ value: DocumentStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Tutti gli stati' },
  { value: 'draft', label: 'Bozza' },
  { value: 'active', label: 'Attivo' },
  { value: 'signed', label: 'Firmato' },
  { value: 'expired', label: 'Scaduto' },
  { value: 'archived', label: 'Archiviato' },
];

const categoryOptions: Array<{ value: DocumentCategory | 'all'; label: string }> = [
  { value: 'all', label: 'Tutte le categorie' },
  { value: 'received', label: 'Documento ricevuto' },
  { value: 'produced', label: 'Documento prodotto' },
  { value: 'communication', label: 'Comunicazione' },
  { value: 'signed', label: 'Documento firmato' },
  { value: 'attachment', label: 'Allegato' },
  { value: 'other', label: 'Altro' },
];

export const DocumentsFilters = ({ filters, onFiltersChange, onReset }: DocumentsFiltersProps) => {
  const practices = getPractices();
  const owners = Array.from(new Set(practices.map((practice) => practice.responsible))).filter(Boolean);

  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, alignItems: 'end' }}>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
          Ricerca
        </Typography>
        <SearchBox placeholder="Codice, nome o proprietario" value={filters.search} onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })} />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
          Stato
        </Typography>
        <Select fullWidth size="small" value={filters.status} onChange={(event) => onFiltersChange({ ...filters, status: event.target.value as DocumentsFilterState['status'] })}>
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
          Categoria
        </Typography>
        <Select fullWidth size="small" value={filters.category} onChange={(event) => onFiltersChange({ ...filters, category: event.target.value as DocumentsFilterState['category'] })}>
          {categoryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
          Pratica
        </Typography>
        <Select fullWidth size="small" value={filters.practiceId} onChange={(event) => onFiltersChange({ ...filters, practiceId: event.target.value as DocumentsFilterState['practiceId'] })}>
          <MenuItem value="all">Tutte le pratiche</MenuItem>
          {practices.map((practice) => (
            <MenuItem key={practice.id} value={practice.id}>
              {practice.code} • {practice.subject}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
          Proprietario
        </Typography>
        <Select fullWidth size="small" value={filters.owner} onChange={(event) => onFiltersChange({ ...filters, owner: event.target.value as DocumentsFilterState['owner'] })}>
          <MenuItem value="all">Tutti i proprietari</MenuItem>
          {owners.map((owner) => (
            <MenuItem key={owner} value={owner}>
              {owner}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <SecondaryButton onClick={onReset}>Azzera filtri</SecondaryButton>
        <PrimaryButton disabled>Filtra</PrimaryButton>
      </Box>
    </Box>
  );
};
