import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { ChangeEvent, FormEvent } from 'react';
import { FormSection, PrimaryButton, SecondaryButton } from '../../../design/components';
import { getActivities } from '../services/activitiesService';
import type { ActivityPriority, ActivityStatus } from '../activities.types';

export interface ActivityFormValues {
  code: string;
  title: string;
  description: string;
  practiceId: string;
  assignee: string;
  group: string;
  status: ActivityStatus;
  priority: ActivityPriority;
  startDate: string;
  dueDate: string;
  notes: string;
}

export type ActivityFormErrors = Partial<Record<keyof ActivityFormValues, string>>;

interface ActivityFormProps {
  values: ActivityFormValues;
  errors: ActivityFormErrors;
  onChange: (field: keyof ActivityFormValues, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const statusOptions = [
  { value: 'todo', label: 'Da fare' },
  { value: 'in_progress', label: 'In corso' },
  { value: 'blocked', label: 'Bloccata' },
  { value: 'completed', label: 'Completata' },
  { value: 'cancelled', label: 'Annullata' },
] as const;

const priorityOptions = [
  { value: 'low', label: 'Bassa' },
  { value: 'normal', label: 'Normale' },
  { value: 'high', label: 'Alta' },
  { value: 'urgent', label: 'Urgente' },
] as const;

const assigneeOptions = ['Laura Bianchi', 'Marco Rossi', 'Sara Verdi', 'Luca Neri', 'Giulia Ferri', 'Paolo Galli', 'Elena Bassi', 'Matteo Sala'];
const groupOptions = ['Amministrazione', 'Segreteria', 'Ufficio tecnico', 'Direzione', 'Controlli'];

export const ActivityForm = ({ values, errors, onChange, onSubmit, onCancel }: ActivityFormProps) => {
  const activities = getActivities();
  const practiceOptions = Array.from(new Set(activities.map((activity) => activity.practiceId))).sort();

  const handleTextChange = (field: keyof ActivityFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field, event.target.value);
  };

  const handleSelectChange = (field: keyof ActivityFormValues) => (event: SelectChangeEvent<string>) => {
    onChange(field, event.target.value as string);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'grid', gap: 3 }}>
        <FormSection title="Dati principali">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <TextField label="Codice attività" value={values.code} disabled size="small" fullWidth />
            <TextField label="Titolo" value={values.title} onChange={handleTextChange('title')} error={Boolean(errors.title)} helperText={errors.title} required size="small" fullWidth />
          </Box>
          <TextField label="Descrizione" value={values.description} onChange={handleTextChange('description')} multiline minRows={4} fullWidth />
        </FormSection>
        <FormSection title="Assegnazione e contesto">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="activity-practice-label">Pratica collegata</InputLabel>
              <Select labelId="activity-practice-label" label="Pratica collegata" value={values.practiceId} onChange={handleSelectChange('practiceId')} error={Boolean(errors.practiceId)}>
                {practiceOptions.map((practiceId) => (
                  <MenuItem key={practiceId} value={practiceId}>
                    {practiceId}
                  </MenuItem>
                ))}
              </Select>
              {errors.practiceId ? <Typography variant="caption" color="error.main">{errors.practiceId}</Typography> : null}
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel id="activity-assignee-label">Assegnatario</InputLabel>
              <Select labelId="activity-assignee-label" label="Assegnatario" value={values.assignee} onChange={handleSelectChange('assignee')} error={Boolean(errors.assignee)}>
                {assigneeOptions.map((assignee) => (
                  <MenuItem key={assignee} value={assignee}>
                    {assignee}
                  </MenuItem>
                ))}
              </Select>
              {errors.assignee ? <Typography variant="caption" color="error.main">{errors.assignee}</Typography> : null}
            </FormControl>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="activity-group-label">Gruppo</InputLabel>
              <Select labelId="activity-group-label" label="Gruppo" value={values.group} onChange={handleSelectChange('group')}>
                {groupOptions.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Note" value={values.notes} onChange={handleTextChange('notes')} multiline minRows={4} fullWidth />
          </Box>
        </FormSection>
        <FormSection title="Stato e scadenze">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="activity-status-label">Stato</InputLabel>
              <Select labelId="activity-status-label" label="Stato" value={values.status} onChange={handleSelectChange('status')}>
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel id="activity-priority-label">Priorità</InputLabel>
              <Select labelId="activity-priority-label" label="Priorità" value={values.priority} onChange={handleSelectChange('priority')}>
                {priorityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <TextField label="Data inizio" type="date" value={values.startDate} onChange={handleTextChange('startDate')} required size="small" fullWidth sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }} />
            <TextField label="Data scadenza" type="date" value={values.dueDate} onChange={handleTextChange('dueDate')} error={Boolean(errors.dueDate)} helperText={errors.dueDate} size="small" fullWidth sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }} />
          </Box>
        </FormSection>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 3 }}>
        <SecondaryButton onClick={onCancel}>
          Annulla
        </SecondaryButton>
        <PrimaryButton type="submit">
          Salva attività
        </PrimaryButton>
      </Box>
    </Box>
  );
};
