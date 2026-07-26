import { Box, MenuItem, TextField } from '@mui/material';
import { FormSection, PrimaryButton, SecondaryButton } from '../../../design/components';
import { getPractices } from '../../practices/services/practicesService';
import { AttachmentUploadArea } from './AttachmentUploadArea';
import type { DocumentCategory, DocumentProvider, DocumentStatus } from '../documents.types';

export interface DocumentFormValues {
  code: string;
  name: string;
  description: string;
  practiceId: string;
  category: DocumentCategory | '';
  status: DocumentStatus;
  owner: string;
  version: string;
  provider: DocumentProvider;
  logicalPath: string;
  documentDate: string;
  dueDate: string;
  notes: string;
}

export interface DocumentFormErrors {
  name?: string;
  practiceId?: string;
  category?: string;
  owner?: string;
  version?: string;
  dueDate?: string;
}

interface DocumentFormProps {
  values: DocumentFormValues;
  errors: DocumentFormErrors;
  onChange: (field: keyof DocumentFormValues, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  selectedFiles: File[];
  onFilesChange: (files: File[]) => void;
  onAttachmentError: (message: string) => void;
}

export const DocumentForm = ({ values, errors, onChange, onSubmit, onCancel, selectedFiles, onFilesChange, onAttachmentError }: DocumentFormProps) => {
  const practices = getPractices();

  return (
    <Box component="form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }} sx={{ display: 'grid', gap: 3 }}>
      <FormSection title="Dati documento">
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' } }}>
          <TextField label="Codice automatico" value={values.code} disabled fullWidth />
          <TextField label="Nome documento" value={values.name} onChange={(event) => onChange('name', event.target.value)} error={Boolean(errors.name)} helperText={errors.name} required fullWidth />
          <TextField label="Descrizione" value={values.description} onChange={(event) => onChange('description', event.target.value)} multiline minRows={3} fullWidth sx={{ gridColumn: { md: 'span 2' } }} />
          <TextField select label="Pratica collegata" value={values.practiceId} onChange={(event) => onChange('practiceId', event.target.value)} error={Boolean(errors.practiceId)} helperText={errors.practiceId} required fullWidth>
            {practices.map((practice) => (
              <MenuItem key={practice.id} value={practice.id}>
                {practice.code} • {practice.subject}
              </MenuItem>
            ))}
          </TextField>
          <TextField select label="Categoria" value={values.category} onChange={(event) => onChange('category', event.target.value)} error={Boolean(errors.category)} helperText={errors.category} required fullWidth>
            <MenuItem value="received">Documento ricevuto</MenuItem>
            <MenuItem value="produced">Documento prodotto</MenuItem>
            <MenuItem value="communication">Comunicazione</MenuItem>
            <MenuItem value="signed">Documento firmato</MenuItem>
            <MenuItem value="attachment">Allegato</MenuItem>
            <MenuItem value="other">Altro</MenuItem>
          </TextField>
          <TextField select label="Stato" value={values.status} onChange={(event) => onChange('status', event.target.value)} fullWidth>
            <MenuItem value="draft">Bozza</MenuItem>
            <MenuItem value="active">Attivo</MenuItem>
            <MenuItem value="signed">Firmato</MenuItem>
            <MenuItem value="expired">Scaduto</MenuItem>
            <MenuItem value="archived">Archiviato</MenuItem>
          </TextField>
          <TextField label="Proprietario" value={values.owner} onChange={(event) => onChange('owner', event.target.value)} error={Boolean(errors.owner)} helperText={errors.owner} required fullWidth />
          <TextField label="Versione iniziale" type="number" slotProps={{ htmlInput: { min: 1 } }} value={values.version} onChange={(event) => onChange('version', event.target.value)} error={Boolean(errors.version)} helperText={errors.version} required fullWidth />
          <TextField select label="Provider di archiviazione" value={values.provider} onChange={(event) => onChange('provider', event.target.value)} fullWidth>
            <MenuItem value="local">Archivio locale</MenuItem>
            <MenuItem value="google_drive">Google Drive</MenuItem>
            <MenuItem value="dropbox">Dropbox</MenuItem>
          </TextField>
          <TextField label="Percorso logico" value={values.logicalPath} onChange={(event) => onChange('logicalPath', event.target.value)} fullWidth />
          <TextField label="Data documento" type="date" slotProps={{ inputLabel: { shrink: true } }} value={values.documentDate} onChange={(event) => onChange('documentDate', event.target.value)} fullWidth />
          <TextField label="Data scadenza" type="date" slotProps={{ inputLabel: { shrink: true } }} value={values.dueDate} onChange={(event) => onChange('dueDate', event.target.value)} error={Boolean(errors.dueDate)} helperText={errors.dueDate} fullWidth />
          <TextField label="Note" value={values.notes} onChange={(event) => onChange('notes', event.target.value)} multiline minRows={3} fullWidth sx={{ gridColumn: { md: 'span 2' } }} />
        </Box>
      </FormSection>
      <FormSection title="Allegati">
        <AttachmentUploadArea selectedFiles={selectedFiles} onFilesChange={onFilesChange} onError={onAttachmentError} />
      </FormSection>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
        <SecondaryButton onClick={onCancel}>Annulla</SecondaryButton>
        <PrimaryButton type="submit">Salva documento</PrimaryButton>
      </Box>
    </Box>
  );
};
