import { Box, MenuItem, Stack, TextField } from '@mui/material';
import { useMemo } from 'react';
import { SecondaryButton } from '../../../design/components';
import { getStatusCatalog } from '../../../shared/services/statusCatalogService';
import type { CalendarFiltersState, CalendarEventType } from '../calendar.types';

interface CalendarFiltersProps {
  filters: CalendarFiltersState;
  onFiltersChange: (nextFilters: CalendarFiltersState) => void;
  onReset: () => void;
  eventTypes: Array<{ value: CalendarEventType | 'all'; label: string }>;
  statuses: string[];
  responsibleValues: string[];
  groupValues: string[];
  practiceValues: Array<{ value: string; label: string }>;
}

export const CalendarFilters = ({
  filters,
  onFiltersChange,
  onReset,
  eventTypes,
  statuses,
  responsibleValues,
  groupValues,
  practiceValues,
}: CalendarFiltersProps) => {
  const statusOptions = useMemo(() => getStatusCatalog('calendar'), []);

  return (
  <Box sx={{ display: 'grid', gap: 2 }}>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} useFlexGap>
      <TextField select label="Tipo evento" value={filters.eventType} onChange={(event) => onFiltersChange({ ...filters, eventType: event.target.value as CalendarEventType | 'all' })} fullWidth>
        {eventTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField select label="Stato" value={filters.status} onChange={(event) => onFiltersChange({ ...filters, status: event.target.value })} fullWidth>
        <MenuItem value="all">Tutti</MenuItem>
        {statuses.map((status) => {
          const label = statusOptions.find((option) => option.value === status)?.label ?? status;
          return (
            <MenuItem key={status} value={status}>
              {label}
            </MenuItem>
          );
        })}
      </TextField>
      <TextField select label="Responsabile" value={filters.responsible} onChange={(event) => onFiltersChange({ ...filters, responsible: event.target.value })} fullWidth>
        <MenuItem value="all">Tutti</MenuItem>
        {responsibleValues.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} useFlexGap>
      <TextField select label="Gruppo" value={filters.group} onChange={(event) => onFiltersChange({ ...filters, group: event.target.value })} fullWidth>
        <MenuItem value="all">Tutti</MenuItem>
        {groupValues.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>
      <TextField select label="Pratica" value={filters.practiceId} onChange={(event) => onFiltersChange({ ...filters, practiceId: event.target.value })} fullWidth>
        <MenuItem value="all">Tutte</MenuItem>
        {practiceValues.map((practice) => (
          <MenuItem key={practice.value} value={practice.value}>
            {practice.label}
          </MenuItem>
        ))}
      </TextField>
      <SecondaryButton onClick={onReset}>Azzera filtri</SecondaryButton>
    </Stack>
  </Box>
  );
};
