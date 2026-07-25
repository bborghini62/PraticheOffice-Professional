import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SearchBox } from '../../../design/components';
import { getActivities } from '../services/activitiesService';
import type { ActivitiesFilters as ActivitiesFilterState, ActivityPriority, ActivityStatus } from '../activities.types';

interface ActivitiesFiltersProps {
  filters: ActivitiesFilterState;
  onFiltersChange: (filters: ActivitiesFilterState) => void;
  onReset: () => void;
}

const statusOptions: Array<ActivityStatus | 'all'> = ['all', 'todo', 'in_progress', 'blocked', 'completed', 'cancelled'];
const priorityOptions: Array<ActivityPriority | 'all'> = ['all', 'low', 'normal', 'high', 'urgent'];

const statusLabels: Record<ActivityStatus | 'all', string> = {
  all: 'Tutti',
  todo: 'Da fare',
  in_progress: 'In corso',
  blocked: 'Bloccata',
  completed: 'Completata',
  cancelled: 'Annullata',
};

const priorityLabels: Record<ActivityPriority | 'all', string> = {
  all: 'Tutte',
  low: 'Bassa',
  normal: 'Normale',
  high: 'Alta',
  urgent: 'Urgente',
};

export const ActivitiesFilters = ({ filters, onFiltersChange, onReset }: ActivitiesFiltersProps) => {
  const activities = getActivities();
  const assignees = Array.from(new Set(activities.map((activity) => activity.assignee))).sort();
  const practices = Array.from(new Set(activities.map((activity) => activity.practiceId))).sort();

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(220px, 1.3fr) minmax(160px, 0.8fr) minmax(160px, 0.8fr) minmax(180px, 0.9fr) minmax(180px, 0.9fr) auto' }, gap: 1.5, alignItems: 'center' }}>
      <SearchBox label="Ricerca" placeholder="Cerca titolo o pratica" value={filters.search} onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })} />
      <FormControl size="small" fullWidth>
        <InputLabel id="activity-status-filter">Stato</InputLabel>
        <Select labelId="activity-status-filter" label="Stato" value={filters.status} onChange={(event) => onFiltersChange({ ...filters, status: event.target.value as ActivityStatus | 'all' })}>
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {statusLabels[option]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" fullWidth>
        <InputLabel id="activity-priority-filter">Priorità</InputLabel>
        <Select labelId="activity-priority-filter" label="Priorità" value={filters.priority} onChange={(event) => onFiltersChange({ ...filters, priority: event.target.value as ActivityPriority | 'all' })}>
          {priorityOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {priorityLabels[option]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" fullWidth>
        <InputLabel id="activity-assignee-filter">Assegnatario</InputLabel>
        <Select labelId="activity-assignee-filter" label="Assegnatario" value={filters.assignee} onChange={(event) => onFiltersChange({ ...filters, assignee: event.target.value as string | 'all' })}>
          <MenuItem value="all">Tutti</MenuItem>
          {assignees.map((assignee) => (
            <MenuItem key={assignee} value={assignee}>
              {assignee}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" fullWidth>
        <InputLabel id="activity-practice-filter">Pratica</InputLabel>
        <Select labelId="activity-practice-filter" label="Pratica" value={filters.practiceId} onChange={(event) => onFiltersChange({ ...filters, practiceId: event.target.value as string | 'all' })}>
          <MenuItem value="all">Tutte</MenuItem>
          {practices.map((practiceId) => (
            <MenuItem key={practiceId} value={practiceId}>
              {practiceId}
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
