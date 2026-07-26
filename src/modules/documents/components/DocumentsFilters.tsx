import { Box, Button, Chip, Stack } from '@mui/material';
import type { DocumentsFilters as DocumentsFilterState } from '../documents.types';

interface DocumentsFiltersProps {
  filters: DocumentsFilterState;
  onFiltersChange: (value: DocumentsFilterState) => void;
  onReset: () => void;
}

export const DocumentsFilters = ({ filters, onFiltersChange, onReset }: DocumentsFiltersProps) => {
  const hasActiveFilters = Boolean(filters.search || filters.status !== 'all' || filters.category !== 'all' || filters.practiceId !== 'all' || filters.owner !== 'all');

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Chip label="Filtri documenti" color={hasActiveFilters ? 'primary' : 'default'} variant={hasActiveFilters ? 'filled' : 'outlined'} />
        <Chip label={filters.status === 'all' ? 'Tutti gli stati' : filters.status} variant="outlined" />
        <Chip label={filters.category === 'all' ? 'Tutte le categorie' : filters.category} variant="outlined" />
      </Stack>
      <Button variant="outlined" size="small" onClick={() => onFiltersChange({ ...filters, search: '', status: 'all', category: 'all', practiceId: 'all', owner: 'all' })}>
        Reset
      </Button>
      {hasActiveFilters ? <Button variant="text" size="small" onClick={onReset}>Chiudi filtri</Button> : null}
    </Box>
  );
};
