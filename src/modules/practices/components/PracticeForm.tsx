import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { ChangeEvent, FormEvent } from 'react';
import type { PracticePriority, PracticeStatus } from '../practices.types';

export interface PracticeFormValues {
  code: string;
  subject: string;
  practiceType: string;
  responsible: string;
  group: string;
  priority: PracticePriority;
  status: PracticeStatus;
  openingDate: string;
  dueDate: string;
  description: string;
}

export type PracticeFormErrors = Partial<Record<keyof PracticeFormValues, string>>;

interface PracticeFormProps {
  values: PracticeFormValues;
  errors: PracticeFormErrors;
  onChange: (field: keyof PracticeFormValues, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const statusOptions: Array<PracticeStatus> = ['draft', 'open', 'in_progress', 'waiting', 'under_review', 'approved', 'completed', 'archived', 'cancelled'];
const priorityOptions: Array<PracticePriority> = ['low', 'normal', 'high', 'urgent'];
const practiceTypeOptions = ['Amministrativa', 'Tecnica', 'Contabile', 'Legale'];

export const PracticeForm = ({ values, errors, onChange, onSubmit, onCancel }: PracticeFormProps) => {
  const handleTextChange = (field: keyof PracticeFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field, event.target.value);
  };

  const handleSelectChange = (field: keyof PracticeFormValues) => (event: SelectChangeEvent<string>) => {
    onChange(field, event.target.value as string);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'grid', gap: 3 }}>
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="h6">Dati principali</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <TextField label="Codice pratica" value={values.code} disabled size="small" fullWidth />
            <TextField label="Oggetto" value={values.subject} onChange={handleTextChange('subject')} error={Boolean(errors.subject)} helperText={errors.subject} required size="small" fullWidth />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="practice-type-label">Tipo pratica</InputLabel>
              <Select labelId="practice-type-label" label="Tipo pratica" value={values.practiceType} onChange={handleSelectChange('practiceType')} error={Boolean(errors.practiceType)}>
                {practiceTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {errors.practiceType ? <Typography variant="caption" color="error.main">{errors.practiceType}</Typography> : null}
            </FormControl>
            <TextField label="Responsabile" value={values.responsible} onChange={handleTextChange('responsible')} error={Boolean(errors.responsible)} helperText={errors.responsible} required size="small" fullWidth />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <TextField label="Gruppo" value={values.group} onChange={handleTextChange('group')} size="small" fullWidth />
            <TextField label="Descrizione" value={values.description} onChange={handleTextChange('description')} multiline minRows={3} fullWidth />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="h6">Dettagli e stato</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="priority-label">Priorità</InputLabel>
              <Select labelId="priority-label" label="Priorità" value={values.priority} onChange={handleSelectChange('priority')}>
                {priorityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel id="status-label">Stato iniziale</InputLabel>
              <Select labelId="status-label" label="Stato iniziale" value={values.status} onChange={handleSelectChange('status')}>
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <TextField label="Data apertura" type="date" value={values.openingDate} onChange={handleTextChange('openingDate')} error={Boolean(errors.openingDate)} helperText={errors.openingDate} required size="small" fullWidth sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }} />
            <TextField label="Data scadenza" type="date" value={values.dueDate} onChange={handleTextChange('dueDate')} error={Boolean(errors.dueDate)} helperText={errors.dueDate} size="small" fullWidth sx={{ '& .MuiInputLabel-root': { transform: 'translate(14px, -9px) scale(0.75)' } }} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 3 }}>
        <Button variant="outlined" onClick={onCancel}>
          Annulla
        </Button>
        <Button type="submit" variant="contained">
          Salva pratica
        </Button>
      </Box>
    </Box>
  );
};
