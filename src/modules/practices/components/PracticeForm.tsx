import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { ChangeEvent, FormEvent } from 'react';
import { getClientDisplayName, getClients } from '../../clients/services/clientsService';
import type { PracticePriority, PracticeStatus } from '../practices.types';

export interface PracticeFormValues {
  code: string;
  subject: string;
  customer: string;
  contact: string;
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

const statusOptions = [
  { value: 'draft', label: 'Bozza' },
  { value: 'open', label: 'Aperta' },
  { value: 'in_progress', label: 'In lavorazione' },
  { value: 'waiting', label: 'In attesa' },
  { value: 'under_review', label: 'Da controllare' },
  { value: 'approved', label: 'Approvata' },
  { value: 'completed', label: 'Completata' },
  { value: 'archived', label: 'Archiviata' },
  { value: 'cancelled', label: 'Annullata' },
] as const;
const priorityOptions = [
  { value: 'low', label: 'Bassa' },
  { value: 'normal', label: 'Normale' },
  { value: 'high', label: 'Alta' },
  { value: 'urgent', label: 'Urgente' },
] as const;
const practiceTypeOptions = ['Amministrativa', 'Tecnica', 'Commerciale', 'Contrattuale', 'Assistenza'];
const responsibleOptions = ['Marco Rossi', 'Laura Bianchi', 'Giulia Ferri', 'Luca Neri'];
const groupOptions = ['Amministrazione', 'Segreteria', 'Ufficio tecnico', 'Direzione'];

export const PracticeForm = ({ values, errors, onChange, onSubmit, onCancel }: PracticeFormProps) => {
  const clientOptions = getClients();
  const handleTextChange = (field: keyof PracticeFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field, event.target.value);
  };

  const handleSelectChange = (field: keyof PracticeFormValues) => (event: SelectChangeEvent<string>) => {
    onChange(field, event.target.value as string);
  };

  const handleCustomerChange = (event: SelectChangeEvent<string>) => {
    const selectedClientId = event.target.value as string;
    const selectedClient = clientOptions.find((client) => client.id === selectedClientId);

    onChange('customer', selectedClientId);
    onChange('contact', selectedClient?.contactPerson ?? '');
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
              <InputLabel id="customer-label">Cliente</InputLabel>
              <Select labelId="customer-label" label="Cliente" value={values.customer} onChange={handleCustomerChange} error={Boolean(errors.customer)}>
                {clientOptions.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {getClientDisplayName(client)}
                  </MenuItem>
                ))}
              </Select>
              {errors.customer ? <Typography variant="caption" color="error.main">{errors.customer}</Typography> : null}
            </FormControl>
            <TextField label="Contatto" value={values.contact} disabled size="small" fullWidth />
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
            <FormControl size="small" fullWidth>
              <InputLabel id="responsible-label">Responsabile</InputLabel>
              <Select labelId="responsible-label" label="Responsabile" value={values.responsible} onChange={handleSelectChange('responsible')} error={Boolean(errors.responsible)}>
                {responsibleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {errors.responsible ? <Typography variant="caption" color="error.main">{errors.responsible}</Typography> : null}
            </FormControl>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="group-label">Gruppo</InputLabel>
              <Select labelId="group-label" label="Gruppo" value={values.group} onChange={handleSelectChange('group')}>
                {groupOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Descrizione" value={values.description} onChange={handleTextChange('description')} multiline minRows={5} fullWidth />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography variant="h6">Dettagli e stato</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="priority-label">Priorità</InputLabel>
              <Select labelId="priority-label" label="Priorità" value={values.priority} onChange={handleSelectChange('priority')}>
                {priorityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel id="status-label">Stato iniziale</InputLabel>
              <Select labelId="status-label" label="Stato iniziale" value={values.status} onChange={handleSelectChange('status')}>
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
