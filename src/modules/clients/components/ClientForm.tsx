import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { ChangeEvent, FormEvent } from 'react';
import { FormSection, PrimaryButton, SecondaryButton } from '../../../design/components';
import type { ClientStatus, ClientType } from '../clients.types';

export interface ClientFormValues {
  code: string;
  clientType: ClientType | '';
  companyName: string;
  firstName: string;
  lastName: string;
  vatNumber: string;
  fiscalCode: string;
  contactPerson: string;
  email: string;
  pec: string;
  phone: string;
  mobile: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  notes: string;
  status: ClientStatus;
}

export type ClientFormErrors = Partial<Record<keyof ClientFormValues, string>>;

interface ClientFormProps {
  values: ClientFormValues;
  errors: ClientFormErrors;
  onChange: (field: keyof ClientFormValues, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const clientTypeOptions = [
  { value: 'company', label: 'Azienda' },
  { value: 'private', label: 'Privato' },
  { value: 'public_entity', label: 'Ente pubblico' },
  { value: 'professional', label: 'Professionista' },
  { value: 'association', label: 'Associazione' },
] as const;

const statusOptions = [
  { value: 'active', label: 'Attivo' },
  { value: 'inactive', label: 'Inattivo' },
  { value: 'archived', label: 'Archiviato' },
] as const;

export const ClientForm = ({ values, errors, onChange, onSubmit, onCancel }: ClientFormProps) => {
  const handleTextChange = (field: keyof ClientFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field, event.target.value);
  };

  const handleSelectChange = (field: keyof ClientFormValues) => (event: SelectChangeEvent<string>) => {
    onChange(field, event.target.value as string);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3 }}>
      <FormSection title="Dati principali">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Codice cliente" value={values.code} disabled fullWidth size="small" />
          <FormControl size="small" fullWidth>
            <InputLabel id="client-type-label">Tipo cliente</InputLabel>
            <Select labelId="client-type-label" label="Tipo cliente" value={values.clientType} onChange={handleSelectChange('clientType')} error={Boolean(errors.clientType)}>
              {clientTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors.clientType ? <Typography variant="caption" color="error.main">{errors.clientType}</Typography> : null}
          </FormControl>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Ragione sociale / Nome" value={values.companyName} onChange={handleTextChange('companyName')} error={Boolean(errors.companyName)} helperText={errors.companyName} size="small" fullWidth />
          <TextField label="Nome" value={values.firstName} onChange={handleTextChange('firstName')} size="small" fullWidth />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Cognome" value={values.lastName} onChange={handleTextChange('lastName')} size="small" fullWidth />
          <TextField label="Referente" value={values.contactPerson} onChange={handleTextChange('contactPerson')} size="small" fullWidth />
        </Box>
      </FormSection>

      <FormSection title="Dati fiscali e recapiti">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Partita IVA" value={values.vatNumber} onChange={handleTextChange('vatNumber')} size="small" fullWidth />
          <TextField label="Codice fiscale" value={values.fiscalCode} onChange={handleTextChange('fiscalCode')} error={Boolean(errors.fiscalCode)} helperText={errors.fiscalCode} size="small" fullWidth />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Email" value={values.email} onChange={handleTextChange('email')} error={Boolean(errors.email)} helperText={errors.email} size="small" fullWidth />
          <TextField label="PEC" value={values.pec} onChange={handleTextChange('pec')} error={Boolean(errors.pec)} helperText={errors.pec} size="small" fullWidth />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Telefono" value={values.phone} onChange={handleTextChange('phone')} size="small" fullWidth />
          <TextField label="Cellulare" value={values.mobile} onChange={handleTextChange('mobile')} size="small" fullWidth />
        </Box>
      </FormSection>

      <FormSection title="Indirizzo e stato">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Indirizzo" value={values.address} onChange={handleTextChange('address')} size="small" fullWidth />
          <TextField label="CAP" value={values.postalCode} onChange={handleTextChange('postalCode')} size="small" fullWidth />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Città" value={values.city} onChange={handleTextChange('city')} size="small" fullWidth />
          <TextField label="Provincia" value={values.province} onChange={handleTextChange('province')} size="small" fullWidth />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Nazione" value={values.country} onChange={handleTextChange('country')} size="small" fullWidth />
          <FormControl size="small" fullWidth>
            <InputLabel id="client-status-label">Stato</InputLabel>
            <Select labelId="client-status-label" label="Stato" value={values.status} onChange={handleSelectChange('status')}>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField label="Note" value={values.notes} onChange={handleTextChange('notes')} multiline minRows={4} fullWidth />
      </FormSection>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
        <SecondaryButton onClick={onCancel}>Annulla</SecondaryButton>
        <PrimaryButton type="submit">Salva cliente</PrimaryButton>
      </Box>
    </Box>
  );
};
