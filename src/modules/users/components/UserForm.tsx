import { Alert, Box, Checkbox, FormControlLabel, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { PrimaryButton, SecondaryButton, SectionCard } from '../../../design/components';
import { getActiveGroups } from '../../groups/services/groupsService';
import { getStatusCatalog } from '../../../shared/services/statusCatalogService';
import type { NewUserPayload, UserRole, UserStatus, UserLanguage } from '../users.types';

interface UserFormProps {
  onSubmit: (payload: NewUserPayload) => Promise<void>;
  isSubmitting: boolean;
  errorMessage?: string;
  initialCode?: string;
}

const roleOptions: Array<{ value: UserRole; label: string }> = [
  { value: 'Administrator', label: 'Amministratore' },
  { value: 'Supervisor', label: 'Supervisore' },
  { value: 'Operator', label: 'Operatore' },
  { value: 'Collaborator', label: 'Collaboratore' },
  { value: 'Viewer', label: 'Visualizzatore' },
];

const statusOptions: Array<{ value: UserStatus; label: string }> = getStatusCatalog('user') as Array<{ value: UserStatus; label: string }>;

const languageOptions: Array<{ value: UserLanguage; label: string }> = [
  { value: 'it-IT', label: 'Italiano' },
  { value: 'en-US', label: 'Inglese' },
];

const initialValues: NewUserPayload = {
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  phone: '',
  qualification: '',
  department: '',
  group: '',
  role: 'Operator',
  status: 'Active',
  language: 'it-IT',
  timeZone: 'Europe/Rome',
  password: '',
  confirmPassword: '',
  mustChangePassword: true,
};

export const UserForm = ({ onSubmit, isSubmitting, errorMessage, initialCode }: UserFormProps) => {
  const [values, setValues] = useState<NewUserPayload>(initialValues);
  const groupOptions = useMemo(() => getActiveGroups().map((group) => group.name), []);

  const codeLabel = useMemo(() => initialCode ?? 'USR-001', [initialCode]);

  const handleChange = (field: keyof NewUserPayload, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <SectionCard sx={{ maxWidth: 900, width: '100%', p: { xs: 3, md: 4 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Nuovo utente
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Codice automatico: {codeLabel}
          </Typography>
        </Box>

        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
              <TextField label="Nome" value={values.firstName} onChange={(event) => handleChange('firstName', event.target.value)} required fullWidth />
              <TextField label="Cognome" value={values.lastName} onChange={(event) => handleChange('lastName', event.target.value)} required fullWidth />
              <TextField label="Nome visualizzato" value={values.displayName} onChange={(event) => handleChange('displayName', event.target.value)} required fullWidth />
              <TextField label="Email" type="email" value={values.email} onChange={(event) => handleChange('email', event.target.value)} required fullWidth />
              <TextField label="Telefono" value={values.phone} onChange={(event) => handleChange('phone', event.target.value)} fullWidth />
              <TextField label="Qualifica" value={values.qualification} onChange={(event) => handleChange('qualification', event.target.value)} fullWidth />
              <TextField label="Reparto" value={values.department} onChange={(event) => handleChange('department', event.target.value)} fullWidth />
              <TextField select label="Gruppo" value={values.group} onChange={(event) => handleChange('group', event.target.value)} fullWidth>
                {groupOptions.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </TextField>
              <TextField select label="Ruolo" value={values.role} onChange={(event) => handleChange('role', event.target.value)} required fullWidth>
                {roleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField select label="Stato" value={values.status} onChange={(event) => handleChange('status', event.target.value)} required fullWidth>
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField select label="Lingua" value={values.language} onChange={(event) => handleChange('language', event.target.value)} fullWidth>
                {languageOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField label="Fuso orario" value={values.timeZone} onChange={(event) => handleChange('timeZone', event.target.value)} fullWidth />
              <TextField label="Password temporanea" type="password" value={values.password} onChange={(event) => handleChange('password', event.target.value)} required fullWidth />
              <TextField label="Conferma password" type="password" value={values.confirmPassword} onChange={(event) => handleChange('confirmPassword', event.target.value)} required fullWidth />
            </Box>
            <FormControlLabel control={<Checkbox checked={values.mustChangePassword} onChange={(event) => handleChange('mustChangePassword', event.target.checked)} />} label="Obbligo cambio password al primo accesso" />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <PrimaryButton type="submit" disabled={isSubmitting} fullWidth>
                {isSubmitting ? 'Salvataggio…' : 'Salva utente'}
              </PrimaryButton>
              <SecondaryButton type="button" fullWidth onClick={() => setValues(initialValues)}>
                Reset
              </SecondaryButton>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </SectionCard>
  );
};
